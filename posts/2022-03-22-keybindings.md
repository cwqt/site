---
title: keybindings on a hhkb
date: 2022-03-22T00:55:00
draft: false
---

there's something about going mouseless that feels super satisfying, you become
limited only by the speed of your thought (/uj). good keybindings help a lot
with that, once you've got the muscle memory down using your computer feels a
bit like playing tetris.

ever since I moved to vim at the start of this year I've been tuning my
keybindings for navigation a lot more, seeing what works & what didn't, going
back and refining... it's taken a fair while to get to the comfortable place I'm
at now

my brain isn't big enough to hold too many combos, so grouping & simplicity was
a must, in order for them to stick there has to be patterns to them rather than
arbitrary `hyper+cmd+shift+alt+y :dothing`, for e.g.

- switching virtual desktops `cmd+<`, `cmd+>` (left, right)
- switching application tabs: `alt+<`, `alt+>`
- moving virtual desktops: `cmd+shift+<`, `cmd+shift+>`
- moving application tabs: `alt+shift+<`, `alt+shift+>`

I try and use `cmd` for system level bindings; copy, pasting, moving between
desktops - then for actually doing things inside applications themselves I use
`alt`, having the of _"I want to move across"_, then narrowed by
application/system via `alt`/`cmd` helps a lot in actually remembering the
bindings

some more:

- closing windows: `cmd+w`
- closing application tabs: `alt+w`
- go to window n (1-9) `cmd+n`
- go to tab n (1-9) `alt+n`
- move between windows `cmd+hjkl`
- move between vim split: `alt+hjkl`
- resize window `cmd+shift+hjkl`
- resize vim split: `alt+shift+hjkl`

etc.

## tiling wms vs tmux

i used to use tabs in kitty for quick switching between my editor and terminals
running server processes, but thinking about it i was just using tabs as a proxy
for windows -- a convenient holding place for something frequently accessed --
having keybinds for kitty tabs & vim tabs was a pain in the ass; i sacked that
off and switching to just using virtual desktops and tiling

## hhkb

haven't made life any easier for myself by getting a hhkb, but the topre
switches are so worth it. i've got a couple of system-level maps that help out
(using [Karabiner-Elements](https://karabiner-elements.pqrs.org)), namely
mapping `hjkl` to arrows, and a big one: **long pressing keys to change their
behaviour**

![hhkb gang](https://ftp.cass.si/q2Vhu.5=l.jpeg)

take `escape` for example, that's waaaay over in the top-right, but then on a
normal keyboard you have `caps lock`, this big fat key that's never pressed to
the right, so a lot of people rebind that to `escape`.

on an hhkb `ctrl` is where `caps lock` is, so I'd lose that, fortunately since
`escape` is only ever used for changing modes it's only ever pressed for a few
hundred millisecons, `ctrl` however is used only for combos and so pressed for a
bit longer than that

we can use this to have the following:

- short press `caps lock` to `escape`
- long press `caps lock` to `control`

long/short pressing opens up a whole new world, totally blew my fuckign socks
off, i've yet to explore much beyond escape/ctrl but probably some other cool
stuff you can do with this

`ctrl+s` & `ctrl+a` to volume up/down is a good one too, much more convenient
than remembering some `Fn` key

## quake style spotify

"quake-style terminals" for things other than terminals is also super useful,
having spotify pop-up on `cmd+shift+s` and switching track/pausing saves me so
much time every day, done via a little python & yabai:

<video width="100%" height="100%" controls="true" src="https://ftp.cass.si/90840i00n.mp4"/></video>

---

this post is probably super autism, but whatever,
[dots here](https://gitlab.com/cxss/dotfiles) if you care
