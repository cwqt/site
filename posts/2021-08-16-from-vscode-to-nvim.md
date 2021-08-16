---
title: "Going from VSCode to Neovim"
date: 2021-04-06T:18:40:00Z
---

i've tried a couple times in the past to make the switch from gui text editors to the cli
but it never seemed to stick, plainly for a few issues:

* terminal emulators were slow, scrolling through large files was choppy
* high learning curve kept productivity down for too long
* overwhelmed by options in extensions & key combos

since i've got this m1 mbp point 1 is a non issue anymore, coupled with kitty using
the terminal has felt like being sat in a tty, so lovely and smooth

points 1 & 2 are solvable, i just have to go about tackling taking on the switch
a bit more methodically, rather than going cold turkey i'll trial it by working in
personal projects first to get my speed on par to using vscode before fully committing

## why switch?

* way too much padding in vscode on a 13" mbp display
* too many icons i never click
  - impossible to hide, even abusing customize UI custom css
* vscode is one hungry hungry ram hippo, and that's a premium on this 8gig machine
* ui isn't in keeping with the rest of the system - bleh
* laptop speed makes it super nice to use the terminal because of speed
* getting into making tuis recently so wanna sorta just live in terminals

main issue is that microsoft are slowly filling the vscode ui with padding/garbage
that i never touch

![new rice](https://ftp.cass.si/89991uFuz.png)

i've also got some new rice going & would be super comfy to have a pretty terminal
instead of a big ugly electron app to work in all day erry day

## things i use all the time in vscode

* mutli-cursors
  - add multi-cursors to end of all matching current selection
* global search & replace
* decent auto-complete with ts-server

will report back when i've setup my nvim with a config that covers these bases
