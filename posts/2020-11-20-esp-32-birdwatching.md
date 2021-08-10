---
title: "ESP-32 Birdwatching"
date: 2020-11-20T17:07:49.000Z
---

There's something nice about feeding birds, that they learn where your feeder is and come back every so often for breakfast and dinner - a bit like a pet.

So far with my feeder I've seen Collared Doves, Wood Pigeons & Great Tits' 👀
I bought an ESP-32 Camera module a month or so ago & last weekend as a break from the agritech thing I've been tinkering with, figured it might be fun to set it up to stream the bird feeder to my website. After a few days of tinkering (90% with the 3d model) I have this;

![camera box thingy](https://ftp.cass.si/y98Zd8451.jpeg)

It's quite simple currently, just a switch, antenna, TP4056 charger, 18650 cell & a boost converter, but open for extension with things like motion detection & notification pushing. For now it just streams, and just earlier I caught my first birds on it!

![two collared doves](https://ftp.cass.si/d984ca03v.png)

I have a RPi setup that proxies the MJPEG stream from the ESP to the internet - as well as providing a couple of routes for getting a timestamped snapshot. I need to add an MQTT broker into the mix at some point to provide a way to track signal strength & battery life.

<https://gitlab.com/cxss/birdcam> for code & schematics 🐦
