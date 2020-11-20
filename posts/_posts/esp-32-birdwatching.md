---
layout: post
date: 2020-11-20 17:07:49 +0000
comments: true
title: ESP-32 Birdwatching
draft: false
published: false

---
There's something nice about feeding birds, that they learn where your feeder is and come back every so often for breakfast and dinner - a bit like a pet.

So far with my feeder I've seen Collared Doves, Wood Pigeons & Great Tits' :eyes:  
I bought an ESP-32 Camera module a month or so ago & last weekend as a break from the agritech thing I've been tinkering with, figured it might be fun to set it up to stream the bird feeder to my website.

It's quite simple currently, just a TP4056 charger, 18650 cell & a boost converter, but open for extension with things like motion detection & notification pushing. But for now it just streams, and just earlier I caught my first bird on it!

![two collared doves](https://ftp.cass.si/N2W3m0va0.png)

I have a RPi setup that proxies the MJPEG stream from the ESP to the internet - as well as provides a couple of routes for getting a timestamped snapshot.