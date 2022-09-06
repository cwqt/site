---
title: recovering data from a fucked CF card
date: 2022-08-01T18:54:00Z
---

picture this, squidding around on my gixxer one night, one hand on the clutch,
the other on my cameras shutter, ride across comfy bridge & take some piccies
hoping at least one comes out nice, get home, plug in the 2004

dump the cards content, make sure the battery is fully charged so it doesn't die
midway through...

```shell
~ λ sudo dd if=/dev/disk4 | pv | dd of=/Users/cass/nikon.img
```

see if `photorec` can get us anything

```shell
~ λ photorec nikon.img
894 images
```

huh, that was easier than I was thinking. unfortunately it appears as if these
are just the files that were marked as deleted, and not actually the ones lost
in the file table somewhere. at this point I can only presume the file table
took a big shit and died, but the magic byte markers still exist, so perhaps
`binwalk` will be some use here

```
~ λ binwalk nikon.img > walk.txt
~ λ cat walk.txt | grep "TIFF" | wc -l
1284
```

ahh okay we do actually have something! that's more than the 894 `photorec` got
us

```
DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
7143424       0x6D0000        TIFF image data, big-endian, offset of first image directory: 8
7144422       0x6D03E6        TIFF image data, big-endian, offset of first image directory: 8
13074432      0xC78000        TIFF image data, big-endian, offset of first image directory: 8
13075430      0xC783E6        TIFF image data, big-endian, offset of first image directory: 8
16205756      0xF747BC        PGP RSA encrypted session key - keyid: 489785D5 A06AA650 RSA Encrypt-Only 1024b
19038208      0x1228000       TIFF image data, big-endian, offset of first image directory: 8
19039206      0x12283E6       TIFF image data, big-endian, offset of first image directory: 8
25034752      0x17E0000       TIFF image data, big-endian, offset of first image directory: 8
...
```

`binwalk` has a flag for "carving" the files out, so giving that a spin:

```shell
~ λ binwalk -z --dd="tiff" nikon.img`
```

my laptop ran out of space a few mins into this, all the extracted files were
coming out as 4gb (the size of the card), so maybe something was up with it not
recognising the terminating bytes

anyway i quickly just bodged that by setting the max size to ~8.5mb (the largest
my raw images tend to be)

```shell
~ λ binwalk -e --dd="tiff" --size=8500000 nikon.img
```

it's not ideal, but hey got my piccies (most of which were trash because it was
dark as fuck and i was half concentrating on trying to ride a motorbike without
crashing)
