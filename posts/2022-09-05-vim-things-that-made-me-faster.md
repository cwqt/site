---
title: just vimmy things that make editing go brrrrr
date: 2022-09-06-18:54:00Z
---

discounting the usual motions schtick of `di{` etc, here's some stuff in vim (or
i've picked up as a consequence of using it) that've geniunely made me faster at
text editing

- `gg` [vim-fugitive](https://github.com/tpope/vim-fugitive) pretty sure
  everyone loves this one, but just `sgc` to commit is nice
- `f` [lightspeed](https://github.com/ggandor/lightspeed.nvim): this plugin
  absolutely fucking slaps, it's probably my most used key, zapping around with
  just `f` + 1-2 chars is really nice & combined with motions like `dtf` makes
  it super fun
- `]e` & `[e` go to next lsp error
- `ge` show error hover doc
- [nvim-surround](https://github.com/kylechui/nvim-surround)
  - seriously can't understate this one, the amount of times i've done something
    like `console.log("v: ${v}")` then done ` cs"`` or  `ysi({`` has probably
    saved me _at-least_ (insert comedically large value) minutes of my life so
    far
- `ctrl+f` complete suggestion, I use this everywhere outside of a terminal now
  also
- `gd` goto definition
- `gr`/`gi` show references / implementations in
  [trouble.nvim](https://github.com/folke/trouble.nvim)
- `<leader>f` fzf
- `<A-i>` open quake terminal
- `macros` hell yea macros, why spend 30 seconds doing something manually when
  you can spend 2 minutes perfecting your macro
