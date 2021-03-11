+++
parent = "post.html"
title = "MoonScript vs classic, middleclass and hump.class "
date = 2017-11-20T14:14:00Z
comments = true
+++

Yesterday I did a little speed-test on MoonScript OO vs 30log. People liked it, they suggested I should do the same thing but with more popular OO libraries, so here I am, writing this post. My last comparison was a bit iffy though, I don't really know 30log that much so I don't know if they way I did it was the fastest, I also used a different loop for inserting objects into a table so maybe that had some slight effect. This time I'm going to try my best to limit the varibales down to simply creating objects, their methods and inheritance.

I'll be comparing three suggested libraries, [classic](https://github.com/rxi/classic), [middleclass](https://github.com/kikito/middleclass) and [hump.class](http://hump.readthedocs.io/en/latest/class.html)

**adn** made this hypothesis. We'll see if it's true.

![adn-bigiftrue]({{site::ftp_assets}}/adn-bigiftrue.png)

I'll be doing a similar test as MS vs log30, testing object creation, methods, and inheritance.
Graphs on the left are log-log scale, where-as the right is log-linear

## Creating objects
We'll create an object called `X`, and insert it into table `t`.
<https://gist.github.com/twentytwoo/38df41452b7ab047c316b0a8cdf34252>

<div class="side-by-side" markdown="1">
  ![msvsall-1]({{site::ftp_assets}}/msvsall-1.png)

  ![msvsall-1-notlog]({{site::ftp_assets}}/msvsall-1-nolog.png)
</div>

## Methods
We'll add a method called `moveXtoY` in class `X`, that makes `self.y = self.x`.
<https://gist.github.com/twentytwoo/7f23960802416bf175fb557fe3ee9781>

<div class="side-by-side" markdown="1">
  ![msvsall-1]({{site::ftp_assets}}/msvsall-2.png)

  ![msvsall-1-notlog]({{site::ftp_assets}}/msvsall-2-nolog.png)
</div>

## Inheritance
We create another class called `Y`, that is a child of `X` and create a bunch of them.
<https://gist.github.com/twentytwoo/75419cc33364571cd2cfc45d506c6d71>

<div class="side-by-side" markdown="1">
  ![msvsall-1]({{site::ftp_assets}}/msvsall-3.png)

  ![msvsall-1-notlog]({{site::ftp_assets}}/msvsall-3-nolog.png)
</div>

## Comparison
I think it's pretty obvious that middleclass is the slowest one here, that's mainly because it's jam-packed full of extra features whilst the other stay minimal hence the overhead.

## And the winner is...
No-one?
In all honesty most of the lag starts to build up when you get past >1000-ish objects, there are only slight millisecond/microsecond differences between the top three libraries.
I'd say looking from these graphs that classic and moonscript are a close tie, hump.class in second place and middleclass last, but at the end of the day it's all just preference!

[Here's](https://www.overleaf.com/read/pzfhtrpdkkdb) the link the the LaTeX graphs used in this post.
