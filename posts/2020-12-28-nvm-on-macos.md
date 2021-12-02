---
title: "nvm using fish shell"
date: 2020-12-28T14:35:00Z
---

apparently now we have node version managers - and i almost don't want to bother
after bad experiences with pipenv / virtualenv but eh..

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
