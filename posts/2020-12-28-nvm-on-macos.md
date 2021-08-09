+++
parent = "post.md"
date = 2020-12-28T14:35:00Z
comments = true
title = "nvm using fish shell"
+++

apparently now we have node version managers, gee i sure hope this doesn't go the way of pipenv / virtualenv

```bash
brew upgrade fish

# install fisher manager & nvm
curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher
fisher install jorgebucaran/nvm.fish

# install latest node & persist across terminals in $PATH
nvm install latest
set --universal nvm_default_version latest
```

et voila

![](https://ftp.cass.si/0sy0=074=.png)
