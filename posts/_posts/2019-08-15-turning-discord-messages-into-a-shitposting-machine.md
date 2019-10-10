---
layout: post
title: Turning my Discord messages into a shitposting machine
date: 2019-08-15 6:21am
draft: true
comments: true
---

markov chain

![](https://ftp.cass.si/==ANygjMwA.png)

![](https://ftp.cass.si/=QjNwQDMwA.png)

https://ftp.cass.si/=kTM5cTMwA.png
https://ftp.cass.si/=cDM5kTO5k.png
https://ftp.cass.si/=gDMycDMwA.png
https://ftp.cass.si/=IDMzMjMwA.png
https://ftp.cass.si/==gNykTMwA.png
https://ftp.cass.si/=gTOxADMwA.png


```python
import os
import csv
import json
c = 0
data = []
for subdir, dirs, files in os.walk("./"):
  for file in files:
    if file == "messages.csv":
      with open(os.path.join(subdir, file)) as f:
        # ID,Timestamp,Contents,Attachments
        r = csv.reader(f, delimiter=",", quotechar='"')
        for row in r:
          data.append(row[2])
          c += 1

print("\n")
print(str(c) + ' instances')
print("creating json...")
with open('data.json', 'w') as f:
  json.dump(data, f)
print("created.")
```