---
title: "make skhd fast again"
date: 2021-08-23T10:03:00Z
---

luv me tiling wm, luv me hotkey daemon, 'ate input lag - simple as.

recently i've been finding using my wm to be a real fucking drag,
often taking upwards of a second to open to open terminals, switch desktops, windows etc.
initially I thought the terminal being slow was just down to [kitty](https://github.com/kovidgoyal/kitty)
having a high startup time, but running some benchmarks proved otherwise so i
decided to look elsewhere, perhaps something to do with the m1 chip & rosetta?

nope, turns out this is down to my hotkey daemon, skhd, and how it actually works; by opening a shell,
running a command, and then immediately closing:

alright, well how fast is my shell (fish) at opening?

```shell
~  hyperfine "$SHELL -c exit"
Benchmark #1: /opt/homebrew/bin/fish -c exit
  Time (mean ± σ):     546.2 ms ±   5.1 ms    [User: 417.9 ms, System: 143.9 ms]
  Range (min … max):   540.8 ms … 557.3 ms    10 runs
```

damn... 546ms to actually start the shell & _then_ run the hotkey, okay let's try
good old bash

```shell
~  hyperfine "/bin/bash -c exit"
Benchmark #1: /bin/bash -c exit
  Time (mean ± σ):       0.7 ms ±   0.7 ms    [User: 0.3 ms, System: 0.3 ms]
  Range (min … max):     0.3 ms …  20.5 ms    1177 runs
```

0.7ms, **bussin** - and for comparison zsh was about 2ms

## okay so how do I get the speed?

open this file in your editor of choice `vi /opt/homebrew/Cellar/skhd/0.3.5/homebrew.mxcl.skhd.plist`
(your specific version may be different)

```diff
 <key>EnvironmentVariables</key>
 <dict>
   <key>PATH</key>
   <string>#{HOMEBREW_PREFIX}/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
+  <key>SHELL</key>
+  <string>/bin/bash</string>
 </dict>
```

the simply add those two lines to set which shell to use, then re-install via
`brew reinstall skhd` & restart the daemon `brew services restart skhd`

there you have it :)
