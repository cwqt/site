---
layout: post
title: JAMstack FTP, electric boogaloo
date: 2019-12-05 11:10pm
comments: true
draft: true
---

Its been a couple of years since I made my post on using JAMstack to make a sort of [file hosting service](https://cass.si/posts/jam-stack-ftp-file-uploader) using Netlify, since then I've made mostly small modifications - re-wrote the auth to use GitLab and had two instances of it running at ftp.cass.si & cass.si/ftp.

And after those two years I have come to a conclusion:

_It kind of sucks._

Standing out to me are a few major issues and just generally shoddy programming out of incompetence at the time. But hey! Years have passed and I'm an infinitely better programmer now, and as a better programmer I shall rectify this thing into a better thing :)

The main glaring issues with the current implementation:

* Using GitLab Access Token as a form of authentication only allows one user to access the service
* Site UI lacking
* Managing files is super time consuming
* Uploading multiple files results in mutlitple commits being made
* Files are roughly 1/3 larger due to blob -> Data URI conversion
* .b64 files don't contain any sort of meta-data like creation date, uploader name etc.
* Code is callback hell incarnate

After spending all of an hour thinking about possible improvements, I came up with these solutions:

* Use Netlify Identities®™ to allow multiple users to access the service and store GitLab API tokens
* Use [Harp.js](http://harpjs.com/) to pre-render a site skeleton into which we load API-grabbed stuff
* Use action hashes with [this](https://docs.gitlab.com/ee/api/commits.html#create-a-commit-with-multiple-files-and-actions) route to send all files in one commit
* Use an external image compression service to make files smaller before converting
* Package files into yaml and include some metadata like creation time & who uploaded it
* Use async/await

<br>

The result:

{% youtube "https://www.youtube.com/watch?v=UWbdnzA8E5I" %}

<br>

Pretty slick eh?

## What even is JAMstack?

I never actually explained this in the previous post - that's because in 2017 I didn't even know the word existed, and the JAMstack community was in it's infancy. So let's take a little time to understand what it is.

JAM means JavaScript, APIs and Markup - a bit inspecific right? Basically there's no server involved, sites are pre-compiled via a continous deployment pipeline (Netlify, ZEIT Now) into static content by a generator (Gatsby, Jekyll... Harp) and served to the end user via a CDN.

![](https://ftp.cass.si/=MDM1QDO5k.jpeg)

Now you might just be thinking: "Cass, what's the big deal with just spinning up some static html, we did that that 10 years ago" - and yes, that's sort of true, but misses out the __A__ part of this whole thing, re-usable APIs that can be accessed over https with JS opens up a world of possibilities - you no longer require a monolithic server on some VPS to handle complex operations and dynamic content (...like authentification).

There are currently a tonne of applications for JAMstack sites, from blogs to , heck even things like [SnipCart](https://snipcart.com/) exist for making e-commerce sites! There's a nice book on JAMstack [here](https://www.netlify.com/pdf/oreilly-modern-web-development-on-the-jamstack.pdf).

## Why JAMstack?

* __Better performance__, sending static pre-made html files is fast as fuq compared to a server generating html on the fly.
* __Higher security__, reduced attack surface, can't really do any SQL injections or XSS scripting if what you're serving is static.
* __Cheaper, scaliability__: When your deployment is simply a stack of files, with more demand the CDN simply picks up the slack like nothing ever happened
* __Easier development__: Loose coupling and separation of controls allow for more targeted development and debugging.

Those are just some generic reasons I peeled off the interwebs([\*](https://jamstack.org/)) - but here's a small anecdote from when I was interviewing at a small web dev. firm.

They brought me in for some test day, learning their stack and whatnot. They weren't really doing anything that involved, mostly just websites for buisnesses with a CMS. And wow, let me tell you, that stack was a giant pile of shit. I wish I was joking - for the entire 3 hours I was there every second was pain, I genuinely felt like I was in a time capsule from 10 years ago the way it was all set up.

Their stack consisted of some buggy in-browser text-editor/CMS all mashed into one, you couldn't edit more than one file at a time, no version control, no macros/multicursor/simple keybindings, it took 4 seconds to save a change, and then another 5 to propogate the change into a live preview.

All their templates are built using some strange templating system in a language called XSLT, which wikipedia describes as "a language for transforming XML documents into other XML documents", so that's fun. There's also no watcher for compiling SASS to CSS making the entire "SASS is required" part of the job application form pointless, I was literally copy-pasting CSS from Sassmeister into the CSS files the whole time. Interestingly the lead dev. agreed with me on a few of these issues on the code review.

After I'd gone home I started thinking about how their *entire* system could be replaced with a Forestry.io & Gatsby/Jekyll/whatever set-up in under a day and be *leagues* better than what they currently had - that just really brought home how powerful JAMstack truly is. Part of me wishes I'd brought home the point a bit more about how bad it all was - but understandably they had something that worked... and just never seemed to want to change.

Anyway, onwards with development!

---

## Architecture

Here's a flow-chart of what goes down when the user uploads a file.

![](https://ftp.cass.si/==AN4ATMwA.jpeg)

There is a short delay of about 30 seconds between a file uploaded and it being accessible because of the compilation time on Netlify's end. 

There are a lot of strings like `CREATED_AT`, `FILE_COUNT` & `INSERT_LIST_HERE`, these are simply regexable terms used during compile time to replace with html/some value.  
For example, <https://ftp.cass.si/list> shows a list of all files in order of upload date, this is generated during compilation using the file data - imagine if this were generated every page load - a lot of overhead.

```js
function getListFileMarkup(files) {
  files.sort(function(a,b){
    return b.creationDate - a.creationDate;
  });

  var listString = "";
  files.forEach((file, i) => {
    var dateString = ` (${timeago.format(file.creationDate)})`
    var fullFilename = file.name + "." + file.extension;
    var markup = `
      <div class="file-item">
        <p>${fullFilename}</p>
        <span>${getFileSizeFromB64(file.data)}kb ${dateString}</span>
        <a href="https://ftp.cass.si/${fullFilename}">&nbsp;&rsaquo;&nbsp;</a>
      </div>
    `
    listString = listString + markup;
  })
  return listString
}
//then INSERT_LIST_HERE replaced with listString
````

---

## Netlify Identities

Previously I had been using a straight GitLab Access Token to authenticate and upload files, but this seemed a bit hacky & I wasn't overly comfortable dishing out keys to friends so they could use my service.

Netlify Identities allows you to authenticate users for things like gated content, site administration etc, and is backed by the [GoTrue](https://github.com/netlify/gotrue-js) API. It's basically an authentication microservice with a database - the only part of interest to the developer is the user-facing API. 

![](https://ftp.cass.si/=YTO1ADMwA.png)

Setting it up is as simple as adding a user on Netlify, downloading the minified [gotrue.js](https://github.com/netlify/gotrue-js/blob/master/browser/gotrue.js) file from the gotrue-js repo and setting up an auth object.

```js
var auth = new GoTrue({
  APIUrl: "https://cass.si/.netlify/identity",
  setCookie: true,
})
````

Unfortunately the Netlify UI has much to be desired and is sort of awkward to set up a user from after this point. I had to get a recovery token and use that to get access to the user object, using that I could set a password via the `.update` function, like so:

```js
auth.recover(recoveryKey).then(user => {
  user.update({ password: password })
})
```

As for actual logging in part, it's as easy as:

```js
//wrap auth in a promise for async/await goodness
async function authUser(username, password){
  return new Promise((resolve, reject) => {
    auth.login(username, password).then(user => {
      resolve(user);
    }).catch(err => reject(err));   
  })
}

//Immediately Invoked Async Function Expression to allow await at top-level
(async () => {
  user = await authUser("someuser", "somepath") // returns User object
})();
````

This is probably the *easiest* user login I've ever created, it has a super nice and condense API, can definitely see myself doing this more often.

This service makes use of the GitLab API and so we can leverage GoTrue to store this token in a `user_metadata` field, which [strangely uses a key](https://github.com/netlify/gotrue-js/issues/44) of `data` in the update function:

```js
function setUserGitlabToken(user, token) {
  return new Promise((resolve, reject) => {
    user.update({ data: { gitlabToken: token } })
    .then(user => resolve(user))
    .catch(err => reject(err));   
  })
}

(async () => {
  user = await authUser("someuser", "somepath")
  setUserGitlabToken(user, GITLAB_TOKEN)
})();
```

---

## Harp.js skeleton

We need some content for our site! I've used Harp.js in the past and while it seems quite dead in developement now, it's nice and simple for little pages like this. 

> Harp serves Jade, Markdown, EJS, CoffeeScript, Sass, LESS and Stylus as HTML, CSS & JavaScript—no configuration necessary.

All I need to do for this part is pass in some markup, write the styles and the JS handles DOM manipulation for adding UI elements later on. During compilation other JS files will replace placeholder strings like `INSERT_LIST_HERE` with the actual html. The skeleton source is [here](https://gitlab.com/cxss/site/tree/ftp/skeleton).

---

## GitLab action hashmap

---

## Client side image compression with tinypng.com

Oh man, what fun I had with this, from CORS issues to ArrayBuffers, this part probably took me the longest to make. tinypng has pretty good documentation all things considered and even a few implementations for different languages... all except client-side using HTTPS.

My thoughts: get image, send image to api, get compressed image, continue as normal. Simple right?

This bullshit.

![](https://ftp.cass.si/4kjNykTO5k.png)

---

## Packing files into yaml

---

## Building







