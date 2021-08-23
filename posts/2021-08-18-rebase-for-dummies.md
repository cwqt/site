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
