---
title: "JAMstack & file hosting"
date: 2017-12-17T11:36:00Z
---

**tl;dr:**
<https://ftp.{{site::title}}/zUzM0ITN3A.png>

Storing all your site assets in one folder on the master branch means that during compilation there is _a looot_ (about 15 seconds) of slowdown when compressing assets.

This is kind of a problem for me, I have this little fake-twitter that I like to post on quite a bit, and from the point of sending off the form to it being live is approx. 35 seconds, so that 15 seconds is a fair amount of overhead.

By splitting site assets from site content allows Netlify to compile both branches concurrently, a la more speed. There's also CPU time saved, the asset branch doesn't need to be compiled everytime a change happens on the master branch, vice versa.

## git gud

Since I only want a branch that stores files, I don't need to drag the entire history of the `master` branch over. I'll call this branch that stores all the files: `ftp`.

What I want to create is an _orphan_ branch, a blank sheet with no prior commit history or content.

```git
git checkout --orphan ftp
git rm -rf .
nano README.md
git add README.md
git commit -m "Added README file"
git push origin ftp
```

## The URL

My go to guy for free domains, <http://freenom.com>, I just added a domain to cart, got it for free and that was it. I'm not going to add any DNS settings on the freenom site since I'm going to let Netlify handle that for me.

## Deploying the ftp branch

Since I'm storing our files on a seperate branch, Netlify can compile that branch and host it on a subdomain, such that the files will be accessible from `https://mysubdomain.mydomain/myfile`.

Netlify can only serve subdomains on _deployed branches_. So firstly I need to add the `ftp` branch to the Branch deploys.

![Adding branch to Branch deploys]({{site::ftp_assets}}/file-uploader-1.png)

You can only have one build command however for all branches, this is a problem since I don't want to run `jekyll build` on the `ftp` branch, instead I can just use a bash script and put all the build commands in there.

For my master branch I have a build script that looks like;

```bash
npm install pug-cli -g && bundle exec jekyll build
```

Since we're also only allowed one Publish directory, I need to move all the content in the `ftp` branch into a new folder called `_site`, the same as the `master` branch (which is by default because of jekyll).

```bash
mkdir _site/
mv * _site/
exit 0
```

`exit 0` is used to let the Netlify build process we've completed successfully, otherwise the build will fail and won't be live.

And then tell Netlify to run that script via `sh build.sh` in the deploy settings.

Great, now that's set up, triggering a deploy causes both branches to be compiled and pushed live.

## Netlify DNS and nameservers

In order to have a subdomain and the domain live, I need to use the Netlify DNS, this involves changing the freenom nameservers over to the Netlify ones.

In `Settings > Domain Management` we can see our specific site nameservers, shown below.

![Netlify nameservers]({{site::ftp_assets}}/file-uploader-2.png)

Going to freenom.com, `Services > My Domains`, click `Manage Domain`, then on navbar click `Management Tools > Nameservers`

Tick the `Use custom nameservers`, add in the Netlify nameservers and we're good to go.

![freenom nameservers]({{site::ftp_assets}}/file-uploader-3.png)

The DNS propogation can take up to 24 hours but it happen fairly quickly with me, under 10 minutes.

## Branch subdomains

Now that my branch deploys and my DNS is handled by Netlify, I can set the ftp branch to a subdomain, this is simply done via `Settings > Domain Management > Branch subdomains`, I just add the `ftp` branch and Netlify automatically adds the DNS record to itself.

Going to <https://ftp.{{site::title}}> I'm greeted by a nice 404 page. At least it works, there's just no `index.html`. I'll add a README to the ftp branch and see if it works.

<https://ftp.{{site::title}}/README.md>

Hey it works!

## The file uploader

Manually uploading content to the branch is a bit crap though, I'd rather have something where I can paste/upload content and push it to `ftp`.

You can see the fruits of my labour at: <https://{{site::title}}/push>

Basically all it does is,

- Function to grab image data from input type file
- Do some input checking to see if we've actually got anything to upload
- Input checking to see if we've added Username + Password
- If we've uploaded a file, take priority over a text paste
- Format file data, name and extension into an object
- Use and ajax script + GitHub API and push contents into the `ftp` directory

A static file uploader with about 10 seconds of propogation from file upload to being live isn't so bad when you think about it. I'm not paying for any server or hosting costs so it's all pretty neat.

## EDIT: Adding binary support

Sooo, after a few hours of trying all kinds of things out to grab and post the raw file data over ajax I gave up. The main issue is that you can only upload content over JSON because of the way the GitHub API works, and of course you can't send binaries over JSON since it's text only.

You can however, convert said files to their data URI's (base64) and send that, it makes the files a bit larger but it's the only way I can think of that'd work with GitHub. This presents another problem, sure, we can see the base64 file representation, but copy/pasting + converting base64 just to get the file is so tedious.

Instead I had to write something that'd convert all files in the `ftp` branch to their binary.

In order to tell which files should be converted (since we can paste text and upload files), I decided to remove the file extension from all files, and instead, any file that is not a paste will have a file extension of `.b64`.

So something like `image.png` will become `image.b64`.

Thinking back to the bash scripts for each branch, all I need to do is write some kind of script in the middle of it all that converts the b64's back into their binaries. Since Netlify uses node to build files I thought I'd try my hand at making it in JS.

I created a file called `compile.js`, and made it run during a deploy.

```bash
mkdir _site/
node compile.js
exit 0
```

Here's the conversion script I came up with, heavily commented for you.

```js
const fs = require("fs");

var assetDir = __dirname + "/";
var resultDir = assetDir + "_site/";

// Get a array with all the files in the current directory
fs.readdir(__dirname, function (err, items) {
  // Loop through them all
  for (var i = 0; i < items.length; i++) {
    let file = items[i];
    // Check if we're dealing with a base64 file
    if (file.split(".").slice(1).join(".") == "b64") {
      // Strip the extension, file only.
      let fileName = file.replace(/\.[^/.]+$/, "");
      // Grab the file data
      let fileContent = fs.readFileSync(assetDir + file, "utf8");

      // Get the true file extension (not .b64)
      let b64Extension = fileContent.split(";")[0].split("/")[1];
      // Strip the header from actual file
      let b64File = fileContent.split(";base64,").pop();

      // Convert to binary and write
      resultFilename = fileName + "." + b64Extension;
      fs.writeFile(resultDir + resultFilename, b64File, { encoding: "base64" }, function (err) {
        console.log("File: " + resultFilename + " created");
      });

      // Finally, remove the b64 file
      fs.unlinkSync(assetDir + file);
    } else {
      // Not a b64 file
      if (file != "_site") {
        //Not a b64 file, move to _site/
        fs.rename(file, resultDir + file);
        fs.unlinkSync(assetDir + file);
        console.log("File: " + file + " created");
      }
    }
  }
});
```

And now it works perfectly, with about 12 seconds from file upload to it being live, not bad considering there's no PHP or node servers involved at all - and it's 100% free!

<https://ftp.{{site::title}}/=ETOxkzNwk.jpeg>

<img src="https://ftp.{{site::title}}/=ETOxkzNwk.jpeg" width="50%">
