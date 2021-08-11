---
title: "lssx, zephyr & lessons learned"
date: 2018-03-16T23:27:00Z
---

Game link: <https://ttxi.itch.io/lssx>\\
Presentation: <https://ftp.cass.si/5cTO0kDM0Y.pdf>\\
Whitepaper: <https://ftp.cass.si/==QMwAzN3g.pdf>

---

EPQ, Extended Project Qualification, is holy grail for brainlets applying to university (e.g. me).

Why is this? Why would any rational person take on such a thing that requires you to actually, physically give a presentation upon completion?

If you somehow manage not to burn out mid-project and write your essay in a mostly coherent fashion, then hey! You're up for a solid chance of getting an A/A\* AS qualification. Honestly no-one cares about the fact that it's another qualification, the _real_ reason why people take it is that universities tend to love that you're being independent, taking on your own research and setting goals - it's supposed to set you up for uni life and as such they'll decrease their entry requirements by one grade.

i.e. AAA --> AAB

Yep, your hours of toiling over your dumb project will result in a slightly increased probability of landing your first choice, great right?

Anyway, I decided to do what's known as an _artefact_ (as opposed to a typical essay), in essence, something you create: art, a story, clothing. I opted to program something (since y'know, it's like the only thing I can use to create anything).

The result is _lssx_.

<iframe width="800" height="400" src="https://www.youtube.com/embed/t9O3deN-wH0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### What is lssx?

It's **L**OVE **S**pace **S**hooter **X** of course!

### And what exactly is LOVE Space Shooter X?

It's a fast-paced, twitchy and unforgiving space-pilot simulator from a bygone era. No, but really, it's little game written in MoonScript using the LOVE game framework.

### Wowee, where can I get it?

- here: <https://ttxi.itch.io/lssx>
- or here: <https://github.com/twentytwoo/zephyr>

---

### zephyr

Okay, lssx and all its components are really, really boring to talk about. Instead I'll blab on about **zephyr**.

**zephyr** is the dumb name for my Box2d wrapper with entity management. Considering this is my second game and the fact that I've never developed anything with more than 7 objects (a la. procedural programming) this was a fairly big deal (which I'm a little proud of). In my previous games I struggled a lot with identifying objects when colliding with something, for example:

```lua
function Object.beginContact(other)
  if other == "Door"
    other:open()
    self:enter(other.room)

  elseif other == "Spikes"
    self:die()
end
```

The whole `other` is the tricky part, which door? Which door do I `:open()`?

Thankfully zephyr solves this in a fairly easily understandable approach (hopefully) - buuuut it does have a lot of issues. Basically, it does this:

![Bullet_Asteroid_UUID](https://ftp.cass.si/==wNycTM4A.png)

Which tells me a Bullet has collided with an Asteroid, it also tells me which Bullet collided with which Asteroid. This makes it super easy to identify object's in a table via the use of UUIDs. \\
All physics interactable objects are placed in a single globally accessible table (which I named `lssx.objects`), and upon any two objects colliding the following Box2D callback function is ran:

```moon
Physics.beginContact = (a, b) ->
  lssx.objects[a\getBody()\getUserData().hash]\beginContact(b, a)
  lssx.objects[b\getBody()\getUserData().hash]\beginContact(a, b)
```

Let's trace through it:

> `= (a, b) ->`

`a`, `b`: The two fixtures colliding.\\

> `a, b`

`a` and `b` are fixtures - and fixtures have bodies.\\
Bodies have something called **UserData** which can be used to store all kinds of useful miscellaneous information that you can manually add, like Universally UNique Identifiers (UUIDs).

If I were to draw all the game objects' UUIDs' next to the object, it'd look like:

![UUID](https://ftp.cass.si/=MTMyIDMwM.png)

If you can recall from earlier, all game objects are assigned a UUID and placed in the `lssx.objects` table. This means that we can add the UUID to the bodies UserData - and it can be used as a sort of text-only pointer.

```lua
self.hash = UUID()
self.body:setUserData({["hash"] = self.hash})
```

Each game object has a function called `beginContact` that get's ran when something collides with us.\\
Now we get to the good part:

> `lssx.objects[a\getBody()\getUserData().hash]\beginContact(b, a)`

- `a`: The fixture a
- `\getBody()`: Get a's body
- `\getUserData().hash`: Get the bodies' UserData, get the value of key `hash` in the UserData table
- `beginContact(b, a)`: Run the beginContact on the object with key `hash` (it's a UUID)

That might seem painfully complicated, but I did zero research on engine devving and entity management but it's what I came up with and works out actually quite nicely. Doing things this way also allows me to add custom hashes, for example the Player has a hash of `Player` (look at the above image) which makes it super easy to access through the rest of the program.

It allows me to do things like this,

```moon
-- in an object (e.g. Player.moon)
beginContact: (other) =>
  collObj = lssx.objects[other\getBody()\getUserData().hash]
  switch collObj.__class
    when 'coin'
      collObj\Pickup()
      collObj\Destroy()
    when 'spikes'
      @Die()
```

Which is just honestly the easiest thing I could possibly imagine. \\
Unfortunately lssx itself kind of got all spaghetti-coded and zephyr was mixed all up in it. I'm going to develop and improve zephyr on it's own since I find it quite nice to work with, although it could definitely use with some improvements.

### Box2D world steps and removals

So we have this amazing function that can easily recognise objects and fixtures and wow it's just so totally great. Buuuut, you can't edit bodies **inside** a callback function (`beginContact`) because it's running within the Box2D world step.

Instead you'd have to add such commands to a buffer/stack/whatever, a buffer that gets ran _after_ the world step, when it's safe. Simple enough. I came up with a fairly nice solution that did this and removed duplicates:

```moon
Physics.update: (dt) ->
  lssx.world\update(dt)
  Physics.runBuffer()
  Physics.buffer = {}

Physics.addToBuffer = (func, hash) ->
  hash = hash or UUID()
  Physics.buffer[#Physics.buffer+1] = {func, hash}

Physics.runBuffer = () ->
  hash = {}
  if #Physics.buffer > 0 then
    for i = #Physics.buffer, 1, -1  do
      -- Detect if we've already seen this function before
      -- So we don't try and delete the same body twice
      if (not hash[Physics.buffer[i][2]]) then
        Physics.buffer[i][1]()
        hash[Physics.buffer[i][2]] = true
        table.remove(Physics.buffer, i)
```

Which was nice and all for a bit, but then I started running into a looot of bugs, the following was occurring:

![nil_object](https://ftp.cass.si/=YjN0QTM5I.png)

The solution, two buffers! (gee bill), one for general body manipulation and other other solely dedicated to removing things, this one gets run at the very end of the frame.

![gee_bill_two_buffers?!](https://ftp.cass.si/yUzNzQTOyQ.png)

So yeah, that's **lssx** and **zephyr**.

Thanks for reading :3
