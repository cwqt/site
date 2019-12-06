---
layout: post
title: "Multiplayer and LÖVE"
date: 2019-02-25 4:35AM
comments: true
---

This is my second (technically 3rd) attempt at re-implementing that old flash game: [1066](https://www.kongregate.com/games/channelfour/1066). My first attempt, `1026` failed because of the way I went about attempting to write it - UI had been my focus, not the game logic, and so both became deeply intertwined, resulting in a totally monstrous pile of shit.

The 2nd attempt failed pretty quickly, I didn't have the motivation.

My third attempt is going much better, I spent some time to research engine design, turn based multi-player implementations and whatnot.
This post is about the multi-player specifically in this 3rd attempt, my tests, failures and the resulting system.

For some background, 1066 used to run on a typical Client/Server architecture which has its upsides and downsides (namely that it no longer works). The upsides to Client/Server architecture are: simpler networking code, hacking detection and no need to share user IPs.

The downsides: you have to run a server - which costs money - and once the servers are down, your game is basically useless.

From the start I've always had in mind to avoid these issues, namely through the use of Peer-to-peer networking. The basic gist of it being a peer acts as both a Server _and_ a client, and they share/receive data accordingly.

The way to go about this turns out to _waaay_ more complicated than I had initially anticipated, but before I get into that, here's what my networking consists of:

# The network

![](https://ftp.cass.si/=IDNxYDO5k.png)

In this diagram you'll see two Peers, Peer_1 and Peer_2, now communication between them would be fantastically easy if not for that box named 'NAT' sat between them and the internet. P2P networking in of itself can be quite easily accomplished without them, after all, all you're doing is telling a server to send x data to y destination.

The reason why NATs exist is because of IPv4.

# The problem

Back in the day when ARPANET was being developed for implementation of TCP/IP there was an issue: packet size vs speed. Source/destinations are defined by IP addresses, the protocol that is mostly used today, IPv4, was created during the time of ARPANET.  IPv4 defines a IP length of 32 bits, which gives us: 4,294,967,296. 4 million IP addresses. We'll never use those all up they said... we did, and now we have NATs.

NAT or Network Address Translation, is pretty simple, you have a local network consisting of many devices that connects to a single NAT, which has a public IPv4 address, if you imagine 20 devices each with their own IP, IPv4 address space would get used up incredibly quickly. NAT solves this in that we no longer have to give out 20 IP addresses, but only one to the NAT.

![](https://ftp.cass.si/=UDM5gzM5k.jpeg)

Each device behind a NAT has a _local address_ of something like: 192.168.0.2 or 192.168.0.12 etc. When data is being sent from a device behind a NAT, each packet has a source address, that being it's local address. The NAT operates what's known as a _mapping table_ which simply re-writes that local address to it's own public IPv4 address. e.g.


<!--<img src="https://ftp.cass.si/=UjN3kjMwA.png" width="50%">-->

```
From Device -> NAT
Source: 192.168.0.23
Destination: 81.12.185.23
  |
  | Mapping
  v
From NAT -> Destination
Source: NAT ADDRESS
Destination: 81.12.185.23
```


Well that's not all, take for example another server wanted to talk to our device behind a NAT, that server knows the NAT exists at some public address, but it doesn't know _which_ device to send it's data to - enter ports.

Ports act as endpoint for communications, services on a computer listen for data on a port. e.g. HTTP listens on port 80. Ports on a NAT must be opened for dat to pass through it to our device.

Expanding on the example before:

```
From Device -> NAT
Source: 192.168.0.23:22122
Destination: 81.12.185.23:5870
  |
  | Mapping
  v
From NAT -> Destination
Source: NAT ADDRESS:22122
Destination: 81.12.185.23:5870
```

When data enters a NAT, the NAT re-translates the incoming data's destination packet to the devices local address.

If both Peers are behind a NAT our situation becomes difficult. Although both may be listening on a port, the NAT won't allow any data through because the NAT's port isn't open. So any incoming data to x port is denied entry. This can be solved with _port forwarding_, but for multi-player games, asking your users to open their routers ports isn't ideal.

# The solution

There are a few ways to deal with this, the most popular being Relaying, i.e. you have a common server with open ports in which both peers can communicate to, and the peers simply exchange data through it - although this is the most reliable it still requires you to run a server :(

Another, but more complex method of opening ports is via TCP Holepunching.



__to be continued__


