---
layout: post
title: Twin Peaks ARG, SAPHIRECALYPSO & Jianting
date: 2019-10-09 5:07pm
comments: true
---

## Twin Peaks saga

I was browsing /lgbt/ one day around the 30th of September and came across the below image posted, kind of a strange thing to be on that board so I read into it, what follows is a what I originally thought to be a silly Netflix advertisement with a bit of cryptography that turns out to be something deeper and more complex. Since there's a fairly large amount to this I'll be brief.

![](https://ftp.cass.si/5EjM5kTO5k.jpeg)

(**edit**, in my research I also found another almost exact copy of this postcard, <https://ftp.cass.si/==wNwEDMwA.jpeg> & <https://ftp.cass.si/==AO5YjN5k.jpeg>)

The postcard, a few interesting things off the bat, the long number having some characters of Pi and the domain <bluerose.network>. This sight has all kinds of weird shit related to Twin Peaks.

<http://bluerose.network/posts/internal-note> This page stood out since it wasn't in the same sort of style of Twin Peaks related stuff; `experiment1 dot p n g` is at the top of the post.

<http://bluerose.network/experiment1.png> resolves to a png with this text in the corner:

![](https://ftp.cass.si/==QN3YDMwA.png) 

>JOUDY is the key
>Owhg rqs iwfnf cpyps.adpvchemiwu.qcckiui/raujcb/

Considering `qcckiui` is the same length as network I thought about doing some kind of plaintext attack, but given we're literally told a key is involved my mind instantly jumps to a vigenere cipher (which funnily enough is the same one my blog uses).

Using <https://www.dcode.fr/vigenere-cipher> and using `JOUDY` results in:

> Find the other image.garmonbozia.network/images/

Going to that site I'm greeted by three different cans of sweetcorn, ok... Maybe the source has something?

![](https://ftp.cass.si/zMzMxADMwA.png)

Sweet, firstly, according to the Twin Peaks wiki garmonbozia is some kind of paste stuff, anyway, theres some ciphertext that's probably some ROT since the spaces are kept in place.

ROT13 results in:

>http://black-lodge.network/c6943df5a29a47f4943/
>the arm knows the way.
>1010am i finally left.

The first domain was actually down for a few days when I initially tried it but it worked later. "The Arm" is some character in Twin Peaks and 1010am is another reference to some guy called Philip Jeffries, this will be useful later on.

Going to <http://black-lodge.network/c6943df5a29a47f4943/> results in a plain black page, again into the source:

```html
<!--
All garmonbozia combined to continue to the lodge. Addition, never subtraction, nor multiplication, nor division.
Once the garmonbozia is combined, include the woodsmans number.
-->
```

All garmonbozia combined? I thought about something to do with steganography but the next part of the sentence quells that.

> Addition, never subtraction, nor multiplication, nor division.

The combination of the sweetcorn cans? addition only? Strange, not sure.

> ...combined, include the woodsmans number

On the postcard there's two numbers, the super long one: `3141123581314159` and the 18 after `woodsman`, since 18 is right next to the word `woodsman` I'm gonna go out on a hunch and say 18 is the woodsmans number.

After a bit of thinking I thought it maybe had to do something with the different sizes, different resolutions of the images? Adding up the resolutions:

```
1.png 560x460  = 1020
2.jpg 522x522  = 1044
3.jpg 938x1500 = 2438
               = 4052, add 18
               = 4520
```

Trying out <http://black-lodge.network/4520/> results in a page with another Twin Peaks reference, and image of some room from the show. Again more stuff behind the source.

![](https://ftp.cass.si/==wMyADMwA.png)

> WW91IHdpc2ggdG8gc3BlYWsgd2l0aCBqb3VkeT8gWW91IHdpc2ggdG8ga25vdyBib2I/IFRoZXNlIHRhc2tzIGFyZSBub3QgZGlmZmljdWx0LiBGdXR1cmUgdGFza3MgYXJlIGRpZmZpY3VsdC4gam91ZHktYW5kLWJvYi5uZXR3b3JrLCB0aGUgZGlyZWN0b3J5IGlzIHRoZSBudW1iZXIgdXBvbiB0aGUgcG9zdGFsIGNhcmQsIGFwcGVuZGVkIHRvIHRoZSBsYXN0IG5hbWUgb2YgbWUuIG15IG5hbWUgKyBudW1iZXIu

My intial thoughts are base64 since it kinda has that vibe to it (I encode all my files in their base64 equivalent so I've seen it a lot).

Following my instinct turned out correct:

>You wish to speak with joudy? You wish to know bob? These tasks are not difficult. Future tasks are difficult. joudy-and-bob.network, the directory is the number upon the postal card, appended to the last name of me. my name + number.

Joudy is another person from Twin Peaks, <joudy-and-bob.network> resolves, but I seem to remember there being nothing there when I tried, it's since been updated, but I'll get to that later.

> the directory is the number upon the postal card, appended to the last name of me. my name + number.

The number on the postcard, I guess the big one: `3141123581314159`
The last name of me? This whole time all the source code comments have been written from the 1st person, "I joined them in February 16th, 1989", "I have seen them use the others", and the ciphered part "1010am i finally left", we can go out and say the person writing this is [Phillip Jeffries](https://twinpeaks.fandom.com/wiki/Phillip_Jeffries).

So, `jeffries3141123581314159`.
<http://joudy-and-bob.network/jeffries3141123581314159/> resolves to a red page with black text.

>13OCT19
>The combined key will unlock the gate.
>31OCT19
>The gate will open for those who have ventured through the black-lodge and eaten the garmonbozia.
>The gate will become known when the time is right.
>9c e9 29 d2 bd 10 a1 93 8c 47 7f 15 51 cf fa 43 10 55 f4 78 98 3a 43 87 2c 94 63 3b e2 d9 db 98 dc 93 5d e8 42 bd fd 73 e6 a1 80 75 1e 5d f7 7a 78 7a d0 8e 2f 77 2b 89 41 9c bb 12 83 cb af d3 10 e2 26 0b a7 61 b0 11 67 94 57 1f 23 9f 00 1d cf 10 cd 8f c9 30 e2 aa d8 2e 14 51 b3 ff da 18 61 61 32 73 82 9e ce 78 b5 bf 66 ee aa 44 56 bb 21 a5 d6 bf 39 6e 19 04 80 49 f0 39 3e b5 e2 01 8d 40 74 48 3b 4c a1 1f b1 4d f7 a5 f3 8b 72 8c dd ef b7 1f 6f 56 67 3b 32 be ca 56 da 55 0e bf 43 56 6f c0 7c 86 1e 85 ac 34 e4 85 03
>1st: EvilJordan
>2nd: NoCountryForMe2112
>3rd: LilBeanBear

The three people listed are reddit users who also solved this back when I was also solving it.

The person of interest is _LilBeanBear_.

---

## Reddit user LilBeanBear

LilBeanBear has been in several threads along with the other people on that list, he didn't seem to contribute much and only mentioned at the end of a thread that some random guy messaged him saying some odd things.

A few days later, he posted this thread: <https://www.reddit.com/r/ARG/comments/dea7j7/arg_or_real_world_creepy_stuff_saphire_calypso/>

He links the following screenshots which show a person going by the same of SAPHIRE CALYPSO detailing how they created the Twin Peaks ARG.

![](https://ftp.cass.si/==gN0QzN5k.png)
![](https://ftp.cass.si/==wNwQDO5k.png)

I've seen a few of these things before, but this guy especially reeks of someone trying to feed a narrative, OP is part of the ARG. There's just something about his typing style, trying way too hard to act like he wants no part, yet simulatanously giving us all screenshots and commentary on what's been happening.

All of that infomation about him being blackmailed with his name/address/etc isn't verifiable by anyone but OP, so why should we trust that he isn't part of it? Personally I feel like a legitimate group whose gone out of their way to create an elaborate ARG/something more and has your doxx, you wouldn't be making reddit posts telling them to "suck it".

SC (Saphire Calypso) reveals that we are welcome to join the final round (implying there were earlier ones) called LORECOCO which starts on the 13OCT19 and ends on 31OCT19.

`joudy-and-bob.network` also notes these as the dates in which:

>The combined key will unlock the gate.

and,

>The gate will open for those who have ventured through the black-lodge and eaten the garmonbozia.

There's also this piece of text which I'm unsure of.
```
--KEYMAT BEGINS--
LORE
COCO

PINEAPPLE
SECRETARY
AMBULANCE
SIGNATURE
HOUSEWIFE
ADMIRABLE
--KEYMAT ENDS--
```

A few days after seeing this reddit, the `joudy-and-bob.network` was updated with a piece of obfuscated javascript, I haven't gotten around to analysing it yet, but it prints `You are searching. You have found. rc4. A natural curve to a longest extent.` 666 times. rc4 a reference to the rc4 cipher maybe?

## Saphire Calypso

tl;dr

* Round 1 pass: 7169:8193(1024)
* Round 2 pass: 97803453238809780877283348
* Round 3 pass:
* Round 4 pass:

Researching Saphire Calypso revealed an absolute goldmine of informationa and similar 'rounds' of ARG.

Apparently this kind of thing has happened 3 times before, each similar in style, cryptography/programming related.

### Round 1

I'm fairly sure Round 1 begins with the below image, which was posted on the Something Awful forums on July 23rd 2019. (It's also linked on imgur <https://imgur.com/gallery/EEAE7YG> by user saphirecalypso)

![](https://ftp.cass.si/xYjM4kTO5k.jpeg)

Robin Sage is the name of a fictious entity created by two white-hat hackers, see more <https://en.wikipedia.org/wiki/Robin_Sage>.

The Hangul translates to:
>Let's play....reality games

The link directs to a Github repo, I can use the commit history to see the original README when this was posted.

```markdown
# F2D64AD97033074E

<img src="https://i.imgur.com/jLNRhZq.png"></img>

<BR><BR><BR>
A head start for some, if they consider it right. The rest will wait till the first, have a nice night.
<BR>  
V7LlqwnpEHM0ydD0MGfhv1sXc5UgG2p1kcz5iljuU0Q=  
```

![](https://ftp.cass.si/5gjM2kTO5k.png)

The image speaks of '7 steps', so I guess this means there are 7 rounds of challenges.

* 1st: Ciphers
* 2nd: Much of the same
* 3rd: This time around and a ketab khune brings your fame
* 4th: Taken from the third
* 5th: An audiovisual treat
* 6th: You meet the l33t
* 7th: Is on us

The string of characters appears to be base64 because of the padding characters at the end, but converting it results in garbage: `W	s40g[s juXSD`

There are 4 other files in this repository, POTATOES, MEAT, CARROTS and VITAMIX.

**POTATOES** is a private key for something called `EC`, ellptical curve cryptography. I'm not sure what these keys are for though.  
Here's a mirror: <https://ftp.cass.si/==QNwADO5k.plain>

**MEAT** is equally as confusing:

```
Alternative Energy Systems - 256
MVDpb5xnigdjz1oCpMSEBSZeZuSYpaAkisr+UtSHwh0lQvNRaHSoU24kd9MBL0Xv
```

**CARROTS** looks like base64 again, but yields garbage.

```
ddw3wp2MhzrZOSw2PsJULvcI1mxoMJ7Q4vDKMeRgb+/AZcEc5MFa17sN6+iZva6k0efTTtTuWNCDCl4o75tM8GPZd7/BLAPbAeU1bkmLJfz1VMpXOXuVpDH3kPqnhsuC9RgPQS7DuT+Pntuf5TqRkgsB24SZlwxhtTCG6wik5HI=
```

**VITAMIX** is instantly recogniseable to me, my ftp service encodes images as a base64 blob, using a converter yields the following image.

![](https://ftp.cass.si/==wMzADNwA.png)

The word "Figure 20.7" implies some kind of book, and the number looks long enough to be an ISBN. `0201633469` directs me to a book called `TCP/IP Illustrated, Vol. 1: The Protocols` published in 1994, same as in the image.

![](https://ftp.cass.si/==wM1IzMwA.png)

The `0.048234 (0.0017) 12` corresponds to a line in the TCP diagram, `FIN,PSH 7169:8193(1024) ack 1, win 4096`.

`FIN;PSH = nextpass = 7169:8193(1024)`

I think this is the end of round 1 since the README states that we are given a head start, yet others will have to wait until the 1st of August.

## Round 2

A day later the README was updated with a link to <https://www.youtube.com/embed/0tEaiyv5Ow0> and some hidden text.

```html
  <!-- #### -->
  <!-- ######## -->
  <!-- ###### -->
  <!-- ####### -->
  <!-- ### -->
  <!-- ## -->
  <!-- ####### -->
  <!-- ####@ -->
```

The video has some interesting captions. <https://ftp.cass.si/==QN2czMwA.png>

**STUFFING** was also added: `67 19 04 bc c2 11 6b 48 a9 d8 cc a2 54 b9`

On July 22, <https://youtu.be/fr-SlQr-jv4> was uploaded (linked from <https://imgur.com/gallery/FaHGYGX>), I can tell from the sounds that there's some kind of data hidden in the audio - steganography.

![](https://ftp.cass.si/3QTN0ADMwA.png)

There's a form of audio steganography called SSTV (slow-scan television) which sounds very similar to the audio in this video, using [Robot36](https://play.google.com/store/apps/details?id=xdsopl.robot36&hl=en_GB) I was able to extract this image.

![](https://ftp.cass.si/xQDO5kTO5k.png)

Going to <https://45.55.24.10/chocolateWonder.msf>:

```
Nin hao

A strong understanding of cryptograpy, investigative research, autodidactic tendencies, and an offensive information security skillset is required to complete this round of SAPHIRE CALYPSO.
Working together is encourgaged. Build your own jianting, to strengthen ours. Thinking outside the tesseract is required.

Keymaterial and a general understanding of the previous round is needed to continue. If you are new to this endevour, please research F2D64AD97033074E.

The Portland, OR dead drop/geocache contains information critical to successful completion of this round. 
Consider audio visual components of SAPHIRE CALYPSO to attain this information. 

USER: The key from the AES cipher in the previous round
PASS: https://pastebin.com/6pr5Trsd

Round 2 registration portal and FLAG, after keymat is collected:
purplewaterbottle.com/saphirecalypso

Your progress throughout this endevour will be monitored through social media usage and analytics, CPE/WAN IP activity, site and service visits connected with SAPHIRE CALYPSO, and OSINT collection methods.
This information will be considered for acceptance into the final round of SAPHIRE CALYPSO.

Round 2 will conclude NLT 8 AUG 19. 

Khoda Hafez,
SAPHIRE CALYPSO
```

Key material (keymat) looks like those weird words in all caps, there was a few in that previous youtube video and the imgur:

```
GREEN
TROUSER
PUMPKIN
DOCK

VIOLET
UMBRELLA
SCARECROW
HARBOR

RED
TIE
SQUASH
TRUCKSTOP
```

The pastebin;

```
a = [They are classed as biologically unacceptable, a menace to the pristine heredity of the race. Once pegged as special, a citizen, even if accepting sterilization, dropped out of history. He ceased, in effect, to be part of mankind.]

b = [For pure will, unassuaged of purpose, delivered from the lust of result, is every way perfect. Every man and every woman is a star.]

M = 13 digit code(a)			<!-- //DELishusRAYcast1984 -->
N = 13 digit code(b)			<!-- //HeferWEISER1987     -->

CONCAT(M,N) = next pass
```

`a` is a quote from _Do Androids Dream of Electric Sleep_ (good book) by _Philip K. Dick_.
`b` is a quote from _The Book of Law_, `b` is actually split from two quotes which can be found at <http://www.thelema101.com/liber-al>.

Both `M` and `N` are 13 digit codes, considering ISBNs have been used before and are 13 digits it would be wise to say those are the probable values.

This leads me on to the comments next to `M` and `N`, I thought they were just more keymats, but I think they're actually placed there such that we get the correct ISBNs.

By pure chance I found this amazon page: <https://www.amazon.com/Book-Law-Aleister-Crowley/dp/0877283346> and to my surprise the publisher is Weiser books! Published in 1987 also.

So N = 9780877283348

And for M, <https://www.abebooks.co.uk/servlet/BookDetailsPL?bi=30081796655&searchurl=kn%3Dandroids%2Bnot%2Bblade%26tn%3Ddo%2Bandroids%2Bdream%2Bof%2Belectric%2Bsheep%26sortby%3D20%26an%3Dphilip%2Bk%2Bdick&cm_sp=msrp-_-msrpdesc-_-bdp>, more of the same, publisher Del Rey and publish year of 1984, ISBN 9780345323880.

Concatenating M and N gives: 97803453238809780877283348 which is our next pass!

Going to <https://purplewaterbottle.com/saphirecalypso> shows another link to a phpBB, <https://purplewaterbottle.com/F2D64AD97033074E/saphirecalypso/>, I tried to sign up but I think I'm too late for it :(

The root of that domain is a site for some water distribution thingy, but all the links go to redcross, I noticed in the bottom left of the page there's an upside down question mark that links to: <http://purplewaterbottle.com/rainbowkitten/lander.php>

Chat contains nothing but a few `<br>`s.

Crypto is quite something, it lists and EC key and RSA private key, linked: <https://ftp.cass.si/==wMyAjMwA.plain>

Files is interesting, it gives us an AES KEY;

```
enoovgUbyr_2016
jaqiqkLqlp_2016
```

and a Virgenereire (sic) key: `Virgenereire`

It also says: `Density has no impact on skillset. Working together is important.`

---

In july the following was posted by saphirecalypso.

```
This forum is fruitful, useful, and fine.
Its population is skilled, turning on a dime.
Twitter was a disappointment, imgur not able.
4chan plain terrible, no skill at the table.
Reddit was youthful, and tried as it might.
But, FVEY and APT39 seem best in this fight.

Analytics tells us all, hidden worlds unknown.
Continue the game, as you have been told.

Find Robin Sage. All is finished before the start.

家庭，

你做得很好。坚持下去。落入兔子巢穴后会导致黄金。

时间不是线性的。匆匆前进，奖品很快被捕获。

学生很快加入，现实世界崩溃。传单已经发布，这个游戏现在将扩展。

8月1日

Gao ci.

D2184EFB8CE04650
```
FVEY and APT39 are the Five Eyes and and Iranian Cyber Espionage Group, strange.

The chinese translates to:

```
family,

You did very well. Stick to it. Falling into the rabbit's lair will lead to gold.

Time is not linear. In a hurry, the prizes were quickly captured.

Students quickly joined and the real world collapsed. The flyer has been released and this game will now be expanded.

August 1st
```

---

On the 24th of June <https://ftp.cass.si/0gDMyADMwA.png> was posted in imgur by SC. Clearly some ROT text, the transcription:

```
Fune Oruxrve,

Frira fgrcf znqr, fvzcyr naq byq. Guvatf abj orpbzr uneqre, qvgpurf sbe enoovg tbyq.
Svfurf bs fpneyrg; JBEQF HAGEHR. Jung lbh ernq zhfg or erzrzorerq naq hfrq narj.

Ivqrbf naq cvpgherd, gryrcubar PUVZRF. Lbhe wvnagvat perngrq, grnzjbex vf fhoyvzr.
Fgrcf hapbhagrq, yrff uvagf guvf gvzr. Pvcure pbzcyrkgl gb fgeratgura lbhe zvaq.

EBPXvat LBHefrys, gelvat gb pnyz. Qvabfnhe xvffrf, zrna lbh ab unez.

30.284373, -90.336190
39.917825, -105.783955
45.602685, -122.741313

Xubqn Unsrm,
phBA8, 1
```

ROT13...

```
Shar Behkeir,

Seven steps made, simple and old. Things now become harder, ditches for rabbit gold.
Fishes of scarlet; WORDS UNTRUE. What you read must be remembered and used anew.

Videos and pictureq, telephone CHIMES. Your jianting created, teamwork is sublime.
Steps uncounted, less hints this time. Cipher complexty to strengthen your mind.

ROCKing YOUrself, trying to calm. Dinosaur kisses, mean you no harm.

30.284373, -90.336190
39.917825, -105.783955
45.602685, -122.741313

Khoda Hafez,
cuON8, 1
```

The words in caps seem to be more keymats...

```
WORDS 
UNTRUE
CHIMES
ROCK
YOU
```

The numbers are lat/longs for some location, probably referring to the geocaches mentioned in chocolateWonder.msf.

The first location is at 'Schleiders Ditch'.
The second one is at 'The Ditch at 40'.
The third one isn't at a ditch related place, but there is a building called 'Ditch Witch', so that fits the pattern.

![](https://ftp.cass.si/==gM3MTO5k.png)

```
All things are sinusoidal
Continued endeavors
round 2 ends
拉斯维加斯：黄金 FADE STAY GREY 剩下
Paths varried and wide, an execution of observation.
Basic puzzles, obfuscation, no intel inside.
Stangers and watchers, no one found the egg.
Rabbit holes filled, a smile in mind.

19 ascend globally, 478 attempted.
Few succeeded, all were welcome.

Jianting: 第3轮指示在论坛上
Jianting: Round 3 instructions to follow on your regions forum.
Jianting: دستورالعمل های 3 دور در سایت خانواده شما قرار دارد.
```

Prime number of people passed.

> Stangers and watchers, no one found the egg.

Sounds like no-one found their geocache.

### Round 3

![](https://ftp.cass.si/4ADOyADMwA.png)

### Round 4

![](https://ftp.cass.si/==AN3YTMwA.png)

### Messaged

Earlier today (10/10/19) I was messaged on reddit by saphirecalypso, I can't reveal all because that "may result in your preclusion from future activities related to “SAPHIRE CALYPSO”, “LORE COCO”, and Jianting", so I guess I have to be somewhat hush hush.

tl;dr: They liked this page, warned me of "enumerating other members" & they said they were interested in my [markov bot](https://gitlab.com/cxss/shortbread/blob/master/commands/markov.moon), that I'll be contact in 24 hours to be involved in LORE COCO and that researching some stuff would be useful to me in the future... they also said I should learn an entire language (lol) either Persian/Mandarin.

Also, I found out that LMR stands for 'labour-management relations'.

I've been thinking that CARROTS and MEAT are possibly PGP/EC encrypted messages, we're given the EC/RSA private keys on that purplebottle.com but the passphrase is unknown.

### ECC & README.md string

I've been doing some research on elliptical curve cryptography and how it's used, ECC doesn't have any specific tools for directly encrypting/decrypting data, instead users use a Diffie-Hellman key change to create a shared secret and then communicate using that, this is known as ECDH.

When <https://github.com/saphirecalypso/F2D64AD97033074E> was created, a string (`V7LlqwnpEHM0ydD0MGfhv1sXc5UgG2p1kcz5iljuU0Q=`) was added to the README, alongside two EC private keys in __POTATOES__, I believe this string to be the shared secret between these and the other files, **MEAT** and **CARROTS** are potentially encrypted messages using these keys.

Apparently openssl is quite particular about how the keys are ordered, a straight copy paste from the file results in:

```
read EC key
unable to load Key
4482551276:error:09FFF064:PEM routines:CRYPTO_internal:bad base64 decode:/BuildRoot/Library/Caches/com.apple.xbs/Sources/libressl/libressl-47.11.1/libressl-2.8/crypto/pem/pem_lib.c:801:
```

Instead I had to format it to strictly 64 characters per line, with the `---- BEGIN EC KEY etc..` on a new line, and the file ending on a new line.

We can extract the public keys from both private keys with OpenSSL. <http://purplewaterbottle.com/rainbowkitten/Crypto/crypto.php> mentions `EC-Prime256v1` as the curve.

```shell
# extract public key from private key
$ openssl ec -in k1_priv_key.pem -pubout -out k1_pub_key.pem
$ openssl ec -in k2_priv_key.pem -pubout -out k2_pub_key.pem

$ cat k1_pub_key.pem
-----BEGIN PUBLIC KEY-----
MIICODCCAa8GByqGSM49AgEwggGiAgEBMEwGByqGSM49AQECQQCq3Z242+nEiz/U
5q4zyfwHyzCNs7PJ0g7WY5zKcDMIcX1NmwCbxmhCrs2hKuajgOYogf8vLYLGhSiq
YFZYOkjzMIGEBECq3Z242+nEiz/U5q4zyfwHyzCNs7PJ0g7WY5zKcDMIcX1NmwCb
xmhCrs2hKuajgOYogf8vLYLGhSiqYFZYOkjwBEB8u7z5RBz6t24YkORohOrjIfcM
C8tJgVJ4l1BL7D42pivN+iMEl2VA9kUAhfLa4UXCJVO0ZXY2iRgOolcYZ0I+BIGB
BGQOzlwSeIcXucG6BsvCpv66hYQkWMVt3p2xdY05wDE9grpRc1zbPqSZqnen1pQ6
ZPej8l/ibwa1G6omlvqQNdpbU0vVlfWvD6LIkjdshKzhu04wGbcWNMARMRWcrgPO
6dmTIYS+7yFr1x3y2t+Gpicwbs/5bbuLrOGYth4A+LMyAkEAqt2duNvpxIs/1Oau
M8n8B8swjbOzydIO1mOcynAzCHBVPlxBTKkmGUGGYRl/rBBHHbHTgQhd2t21h5aC
nKkAaQIBAQOBggAEACBgX3sJ7CZ3ZQDdzTMb3pT1sYtrcYlZ0QSLmIUEsLg8Ry0f
9AplsfKnx1qvzPJuB/X/J0Yvfeb8KgvV0MyeeQySjn45jkkyTZn5iFqMjTPRaa+U
rtsGsMTtnRO1449ka/QKvJXRiLNtGT7GejpBa+ISHbR9kA8u61f/8UUrk9c=
-----END PUBLIC KEY-----
$ cat k2_pub_key.pem
-----BEGIN PUBLIC KEY-----
MIICODCCAa8GByqGSM49AgEwggGiAgEBMEwGByqGSM49AQECQQCq3Z242+nEiz/U
5q4zyfwHyzCNs7PJ0g7WY5zKcDMIcX1NmwCbxmhCrs2hKuajgOYogf8vLYLGhSiq
YFZYOkjzMIGEBECq3Z242+nEiz/U5q4zyfwHyzCNs7PJ0g7WY5zKcDMIcX1NmwCb
xmhCrs2hKuajgOYogf8vLYLGhSiqYFZYOkjwBEB8u7z5RBz6t24YkORohOrjIfcM
C8tJgVJ4l1BL7D42pivN+iMEl2VA9kUAhfLa4UXCJVO0ZXY2iRgOolcYZ0I+BIGB
BGQOzlwSeIcXucG6BsvCpv66hYQkWMVt3p2xdY05wDE9grpRc1zbPqSZqnen1pQ6
ZPej8l/ibwa1G6omlvqQNdpbU0vVlfWvD6LIkjdshKzhu04wGbcWNMARMRWcrgPO
6dmTIYS+7yFr1x3y2t+Gpicwbs/5bbuLrOGYth4A+LMyAkEAqt2duNvpxIs/1Oau
M8n8B8swjbOzydIO1mOcynAzCHBVPlxBTKkmGUGGYRl/rBBHHbHTgQhd2t21h5aC
nKkAaQIBAQOBggAEoI9gVsml+GNLxmilqvFxroMcAwEqk4ZFEtw0b1qGFJeyETgB
CYsBUiFMubH15AIoWVDrSsBWXUOmJHRVbD1XDWa+OuEmFKLoZuyRczjRDhALkrst
MgWvGD/iV8tPwTPTJLg78aD7lbAHvu3JbCICljBrj0t4CeQOHvfrIkIPQUc=
-----END PUBLIC KEY-----
                          
$ openssl pkeyutl -derive -inkey k1_priv_key.pem -peerkey k2_pub_key.pem -out k1_shared_secret.bin
$ openssl pkeyutl -derive -inkey k2_priv_key.pem -peerkey k1_pub_key.pem -out k2_shared_secret.bin

# secrets are the same
$ base64 k1_shared_secret.bin
k3J6+adIZ/wuPlQosrA0vbdmF8P9XOKNrPMzRLFlnzmmuGYVFU9k8pODx5s8mQlQRLCOhS985drlgvOdKHBXhw==
$ base64 k2_shared_secret.bin
k3J6+adIZ/wuPlQosrA0vbdmF8P9XOKNrPMzRLFlnzmmuGYVFU9k8pODx5s8mQlQRLCOhS985drlgvOdKHBXhw==

# encrypt & decrypt
$ openssl enc -aes256 -base64 -k $(base64 k2_shared_secret.bin) -d -in cipher.txt -out plain_again.txt
```

Maybe the shared secret is what's meant as the 'combined key' that unlocks the gate on 13/10/19? Pure speculation at this point.

While I was at it I thought'd I'd generate the public key for the EC key on purplewaterbottle/crypto

```shell
# ec
$ cat krabbit_priv_key.pem
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIHuF5HHcI0ZwKHiAgOBO2yd/pG0gm5J4iU+KXjzgYZEBoAoGCCqGSM4
9 AwEHoUQDQgAE+ofJXavdb/6dl8Rm8TRwkI/aVkzlK2hn0w05XL4wfo9Ivd8HP
k6w zvCyNChq+fjExyCeP+q+OOx7GOkfvNCf2g==
-----END EC PRIVATE KEY-----
# ec
$ cat krabbit_pub_key.pem
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE+ofJXavdb/6dl8Rm8TRwkI/aVkzl
K2hn0w05XL4wfo9Ivd8HPk6wzvCyNChq+fjExyCeP+q+OOx7GOkfvNCf2g==
-----END PUBLIC KEY-----
```

At this point I'm unsure of what to do, there's no real hints, just a collection of random characters that don't really have any meaning or connection that isn't simply created out of my own desperation to potentially fit some pieces together. Suffering from an extreme lack of information, not aided by the fact there there's 22 threads on that phpBB forum that I still don't have access to.

