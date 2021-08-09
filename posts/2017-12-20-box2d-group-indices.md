+++
parent = "post.md"
title = "Box2D Group Indices"
date = 2017-12-20T02:38:28Z
comments = true
+++

## What are Group Indices?

The group index flag can be used to override the category or mask of a _fixture_. As the name implies it can be used to group certain fixtures together to describe if they should or should not collide, a good example would be Friendly Fire, friendly players don't get hit by friendly bullets, vice versa.

A group index is an integer ranging from -32768 to 32767.

```lua
Fixture:setGroupIndex( index )
```

## How they work

- if either fixture has a groupIndex of **zero**, use the category/mask rules as above
- if both groupIndex values are **non-zero** but **different**, use the category/mask rules as above
- if both groupIndex values are the **same** and **positive**, collide
- if both groupIndex values are the **same** and **negative**, don't collide

What we're really interested in are the last two points. \\
I'll give an example, say we have two rectangles, `A` and `B`.

```lua
A.fixture:setGroupIndex(1)
B.fixture:setGroupIndex(1)
```

They both have the same index, `1`, which is a positive number, therefore `A` and `B` will collide.

```lua
A.fixture:setGroupIndex(1)
B.fixture:setGroupIndex(-1)
```

Although `A` and `B` have the same absolute value, `1`, they are not the same number, thus they fit into the point of non-zero but different.

```lua
A.fixture:setGroupIndex(-1)
B.fixture:setGroupIndex(-1)
```

Finally, both fixtures have the same index and are negative, therefore there is no collision between the fixtures.

### References

<http://www.iforce2d.net/b2dtut/collision-filtering> \\
<https://love2d.org/wiki/Fixture:setGroupIndex>
