---
title: "Setting up M1 MBP"
date: 2021-08-09T12:20:00Z
---

recently got my hands on the new m1 macbook, this thing is stupid fast and makes like zero heat - anyway here's a guide for setting up the following on this new architecture:

* package manager, [homebrew, obviously](https://brew.sh/)
* terminal emulator, [kitty](https://sw.kovidgoyal.net/kitty/)
* shell, [fish](https://fishshell.com/) & [fisher](https://github.com/jorgebucaran/fisher/issues)
* pretty good privacy, [gnupg](https://formulae.brew.sh/formula/gnupg)
* node version manager, [nvm](https://github.com/nvm-sh/nvm)
* keybindings daemon, [skhd](https://github.com/koekeishiya/skhd)
* tiling wm, [yabai](https://github.com/koekeishiya/yabai)
* increase key repeat & animation speed across os
* setup ssh keys for gitlab & github

open up `Terminal.app` and follow along :)

## brew, kitty, fish & nvm

```bash
# get homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# get kitty terminal
brew install --cask kitty

# get my kitty config & add to .config
mkdir ~/.config/kitty
curl https://gitlab.com/cxss/dotfiles/-/raw/master/kitty/kitty.conf >> ~/.config/kitty/kitty.conf

# install fish shell via homebrew
brew install fish

# check it works 
fish

# get the path of fish installation, varies depending on intel or m1 
# for m1s all homebrew packages are at /opt/homebrew
# for intel its /usr/local/bin
which fish

# add this path to /etc/shells
sudo nano /etc/shells

# set default shell to fish
chsh -s `which fish`

# install fisher plugin manager & nvm
curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher
fisher install jorgebucaran/nvm.fish

# install latest node & persist across terminals in $PATH
nvm install latest

# install nvm omf package with fisher
# will set PATH vars to persist nvm/node across new shells
fisher install oh-my-fish/nvm
refresh

# use node
nvm list
nvm use latest

# done!
node -v

# install gnupug
brew install gnupg
```

## yabai & skhd

for big sur you have to remove System Integrity Protection to allow for the scription addition of yabai (this is useful for skhd), you enter recovery mode by first turning off your mac, and then holding the power button until you see the apple logo & some text that says "loading options..." or something along those lines, & then clicking the "Options" icon once prompted

```bash
# once inside recovery mode, open up a terminal from the Utilities section in the top bar
csrutil disable --with kext --with dtrace --with basesystem

# now reboot
```

once back into your normal system

```bash
# add this boot arg to allow for application binary interface
sudo nvram boot-args=-arm64e_preview_abi
# reboot again
```

after rebooting & logging in once again

```bash
# install keyboard daemon for keyinding yabai scripts
brew install koekeishiya/formulae/skhd

# get my skhd config
curl https://gitlab.com/cxss/dotfiles/-/blob/master/.skhdrc >> ~/.skhdrc
brew services start skhd

# install yabai fork which works with big sur
brew install --HEAD xorpse/formulae/yabai
# install & load scripting add-on
sudo yabai --install-sa
sudo yabai --load-sa

# get my yabai config which has code for loading the scripting add-on every time yabai starts
# as well as starting skhd as a daemon
mkdir ~/.config/yabai
curl https://gitlab.com/cxss/dotfiles/-/raw/master/.yabairc >> ~/.config/yabai/yabairc

# as one final step we need to give this script sudo permissions to automatically start the scripting add-on
# see https://github.com/koekeishiya/yabai/wiki/Installing-yabai-(latest-release)#macos-big-sur---automatically-load-scripting-addition-on-startup
sudo visudo -f /private/etc/sudoers.d/yabai

# add one of these lines to that file
# change yabai path according to cpu type, /opt/homebrew is for M1
# YOUR_USERNAME ALL = (root) NOPASSWD: /usr/local/bin/yabai --load-sa
# YOUR_USERNAME ALL = (root) NOPASSWD: /opt/homebrew/bin/yabai --load-sa
```

source for some of this part: <https://github.com/koekeishiya/yabai/issues/725#issuecomment-861753811>

## overwriting some defaults

increase dock show speed & reduce animation time

```shell
defaults write com.apple.dock autohide-time-modifier -float 0.3;killall Dock
defaults write com.apple.dock autohide-delay -float 0; killall Dock
```

increase key repeat

```shell
defaults write -g InitialKeyRepeat -int 10 # normal minimum is 15 (225 ms)
defaults write -g KeyRepeat -int 1 # normal minimum is 2 (30 ms)
```

turn off dock showing recent applications

> go to System Preferences > Dock & Menu Bar, then uncheck the box for "Show recent applications in Dock"

turn off virtual desktops being re-arranged

> go to System Preferences > Mission Control, then uncheck box for "Automatically rearrange Spaces based on most recent use"

## ssh keys for gitlab & github

```shell
# github
ssh-keygen -t rsa -C your@email.com -f ~/.ssh/id_rsa_GITHUB
cat ~/.ssh/id_rsa_GITHUB.pub
# add new key to github at https://github.com/settings/ssh/new

# gitlab
ssh-keygen -t rsa -C your@email.com -f ~/.ssh/id_rsa_GITLAB
cat ~/.ssh/id_rsa_GITLAB.pub
# add new key to gitlab at https://gitlab.com/-/profile/keys

# get my ssh config which configures to use different key based on git hostname
curl https://gitlab.com/cxss/dotfiles/-/raw/master/.ssh/config >> ~/.ssh/config

# restart ssh agent
sudo launchctl unload /System/Library/LaunchDaemons/ssh.plist
sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist 
```
