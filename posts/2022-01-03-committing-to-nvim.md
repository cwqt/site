---
title: comitting to nvim
date: 2022-01-03T13:15:00
---

i said in a previous post & my 2021 review that i'd be moving from vscode to
nvim, and over the xmas holiday i decided to try and do that. at first i tried
to kept things simple, installing the neovim vscode extension and just getting
myself comfortable with modal editing; though after a few hours this quickly
became apparent it wasn't going to work, every so often the extension would just
lock up and do nothing, forcing a hard restart. just a bit annoying.

so i decided to say fuck it and go cold turkey, spending the last week or so
customising and going through various workflows to replicate all the spoils that
vscode gives us out of the box.

fwiw i use [kitty](https://github.com/dexpota),
[neovim](https://github.com/neovim/neovim), &
[fish](https://github.com/fish-shell/fish-shell) with the
[kanagawa](https://github.com/rebelot/kanagawa.nvim) colour scheme

<img src="https://ftp.cass.si/9fsRpo827.png" style="max-width:100% !important"/>

so here's a list things i needed and used a tonne, ~ but in nvim ~

- tabs <https://github.com/romgrk/barbar.nvim>
- peek & jump into definition <https://github.com/glepnir/lspsaga.nvim>
- typescript lsp & autocomplete <https://github.com/ms-jpq/coq_nvim>
- error lens <https://github.com/folke/trouble.nvim>
- select mutliple lines & re-indent `visual line mode and <</>>`
  - prettier (on save) <https://github.com/sbdchd/neoformat>
  - select line after line & comment <https://github.com/numToStr/Comment.nvim>
- file tree (with collapse all) <https://github.com/cwqt/chadtree>
  - renaming, cutting, pasting
- fuzzy finder for files & symbols <https://github.com/junegunn/fzf.vim>
- global search & replace <https://github.com/nvim-pack/nvim-spectre>
- git
  - status line <https://github.com/nvim-lualine/lualine.nvim>
  - git wrapper <https://github.com/tpope/vim-fugitive>
  - graph <https://github.com/rbong/vim-flog>
  - view staged, added <https://github.com/sindrets/diffview.nvim>
  - merge conflict indicators <https://github.com/rhysd/conflict-marker.vim>
  - line edit markers <https://github.com/lewis6991/gitsigns.nvim>
  - blame <https://github.com/APZelos/blamer.nvim>
- multicursor (insert at all matching selection) `macros!`
- terminal management <https://github.com/akinsho/toggleterm.nvim>
- codetime integration -- no support :(

some other super useful plugins:

- movements like `sr"(` - change `"foo"` to `(foo)`
  <https://github.com/machakann/vim-sandwich>
- indentation markers <https://github.com/lukas-reineke/indent-blankline.nvim>

i highly doubt this is the end of the tweaking, but it's a good enough start to
keep me on a similar level of productivity as in vscode. as far as how it's
going now? quite nice, I'm enjoying learning the movements and feeling myself
getting faster, though I still need to learn some of the workflows for git
related stuff, merge issues etc. but will get onto that when I'm back to work

# some annoying things i had to figure out

inserting hashtags, had to rebind the input code in `kitty.conf` to insert a
literal `#`

```txt
map alt+3 send_text all #
```

getting `<A-1>` codes to work in kitty, would not work otherwise without this
line

```txt
macos_option_as_alt yes
```

aligning content to the top-left of the content box in kitty, otherwise you get
a small padding gap due to font size not being a multiple of the terminal
dimensions, which looks kinda ugly on status/tablines

```txt
placement_strategy top-left
```

<br/>
<br/>

getting `fzf` to ignore `node_modules` and friends, first install `ripgrep`,
then in `fish.config`

```shell
set -x FZF_DEFAULT_COMMAND 'rg --files --no-ignore --hidden --follow -g "!{.git,.next,node_modules}"'
set FZF_CTRL_T_COMMAND "$FZF_DEFAULT_COMMAND"
```

then in `init.vim`, add

```vim
set shell=/opt/homebrew/bin/fish " use fish
```

## update: realising that fish is once again fucking me

as discovered in [[2021-08-23-fixing-skhd-lag]] it turns out setting your
default shell to `fish` is a terrible idea, I was noticing that switching to
buffers was being painfully slow, in a way that reminded me of switching
desktops was in yabai with skhd, so based off that hunch i swapped my default
shell back to bash, and well the results speak for themselves:

<img src="https://ftp.cass.si/=1U6vkdr=.png" style="max-width: 100% !important" />

top: with fish, bottom: with bash

to getting `fish` back in the terminal using `toggleterm` i just had to set the
`shell` option to the location of `which fish`
