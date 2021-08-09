+++
parent = "post.md"
title = "Hosting over dat protocol"
date = 2018-12-08T23:43:00Z
comments = true
+++

In an attempt to fight off my sleep deprivation I'll write this post about a little something called `dat`. I recently bought a vps for $3.50pm and figured I'd have a go at some things I've been wanting to do but never had a dedicated server for.

Hopefully this post acts as a guide to anyone else wanting to serve their site with `dat`.

So, what is `dat`? It's described as: "a new p2p hypermedia protocol". It's like http, but instead of being centralised it's a peer-to-peer distributed web. Nice. So basically if my server dies someone out there in the vast expanse of the internet will have a copy of my trashfire site and other people can grab it from them instead of my choking server.

My `dat` site is located at: [dat://caß.si](dat://caß.si) (yes your really can use the eszett...), which is just the cutest looking domain I've seen...

### Installing dat

I'm using Debian 9 so your installation process may vary slightly... First, some updates, install node package manager and install dat, easy as.

```shell
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install nodejs
sudo npm install npm
sudo install -g dat
```

Test it works via `dat -v`.

### Serving files over dat

Create a new folder, add some content and share it.

```shell
mkdir my_folder
cd my_folder
touch index.html
nano index.html
#add some html stuff
dat share
```

And you should get:

```shell
$ dat share
Created new dat
dat://5a4575c632d1a573...
```

You can think of the `dat://5a4575c632d1a573...` as your address, paste that into [Beaker Browser](https://beakerbrowser.com/) and you should see the content of your html file:

![](https://ftp.cass.si/=YTM3YTM4k.png)

Hey, neato.

That's all well and good, but no-one can remember a 64 character address, this is where domains come in.

### Setting up a domain name

I want to access my dat site via `dat://cass.si`. This can easily be achieved by creating a `TXT` record in your DNS. Note: this method does not work with http mirroring, you have to use a `.well-known` file for that, [more info...](https://beakerbrowser.com/docs/guides/use-a-domain-name-with-dat)

Simply create a `TXT` record and set the target to `datkey=<your_dat_address>`, so for my site it looks like the following:

![](https://ftp.cass.si/3YTN3IDMwA.png)

It might take a bit for the DNS to propogate but all things going to plan...

![](https://ftp.cass.si/=MTNzMDMwA.png)

Yay.

### Making it permanent

Now then, since `dat` is peer-to-peer there needs to be at least one person on the network at all times hosting the files, this is where `hypercore` comes in.

`hypercore` is a program written by the people that made `dat` for use in hosting multiple dats. To install it:

```shell
sudo npm install -g hypercored
```

Now we need to add our `dat` address to it so it knows what to watch, `hypercored` does this with use of a `feeds` file:

```shell
echo 'dat://<your_dat_address' >> feeds
```

You can use your domain too, so I did: `echo 'dat://cass.si' >> feeds` and it works fine.

Finally, start up `hypercored`.

```shell
$ hypercored
Watching ~/dat/feeds for a list of active feeds
Archiver key is 42471e32d36be3cb617ec1df382372532aac1d1ce683982962fb3594c5f9532a
Swarm listening on port 58184
```

Now it should watch your dats for any changes and update them accordingly. And there you have it.
