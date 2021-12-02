---
title: "git rebase for dummies"
date: 2021-08-18T11:01:00Z
draft: true
---

## rebase is merge but without adding ugly merge commit messages

```
merge        rebase
  |       main    pr
  |        |       |
  x\       x       x
  | \      |\      |
  x  o     x \     x
  |  |     |  o    |
  x  o     x  |    x
  |  /     |  o    |
  | /              o
  x/         after |
  |                o
```

transpose pr head into main head

```shell
git checkout -b cool-thing
# do work
git checkout staging
git pull
git checkout cool-thing
git rebase -i staging

# reword: re-write commit message
# fixup: merge commit into one above, drop commit
# squash: merge commit into one above, re-write message
# drop: delete this commit & all it's code
```
