---
title: "nicely formatted go"
date: 2021-12-12T02:18:00Z
---

i'm kind of a lazy programmer and manually formatting code is suuuch a chore,
`prettier` takes care of that for me in TS and makes my code look, well, pretty.

i've been writing `go` for a bit now and while `gofmt` is quite nice they [intentionally don't do line wrapping](https://github.com/golang/go/issues/11915).
bummer.

luckily some cool dude out there made [golines](https://github.com/segmentio/golines), "A golang formatter that fixes long lines".

you can emulate a `prettier` style auto formatting by coupling the [Run on Save extension](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave) with `golines`.

```shell
go install github.com/segmentio/golines@latest
```

then open up `settings.json` & add this:

```json
  "emeraldwalk.runonsave": {
    "commands": [
      {
        "isAsync": true,
        "cmd": "[ -f go.mod ] && golines . -w -m 80" // -m max line length
      }
    ]
  },
```


![](https://ftp.cass.si/6740jmt83.png)


noice.


