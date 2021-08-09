+++
parent = "post.md"
title = "On TypeScript enums"
date = 2021-08-09T12:20:00Z
+++

I'm not a huge fan of TypeScripts `enum`s - to me they're a bit of syntax sugar around unions with some added footguns, problems arise when trying to iterate over them which can throw people new to the language off plainly due to how they're transpiled into JavaScript.

## Enums explained

In its most basic form an enum is simply:

```ts
enum Test {
  Hello,
  World,
}
```

So `Test.Hello` = 0 & `Test.World` = 1 - this is the worst kind of enum in my opinion as doing `Object.keys`, `Object.values`, `Object.entries` will return seemingly very strange results.

```ts
Object.keys(Test); // ["0", "1", "Hello", "World"]
Object.values(Test); // ["Hello", "World", 0, 1]
Object.entries(Test); // [["0", "Hello"], ["1", "World"], ["Hello", 0], ["World", 1]]
```

Which at first glance might make you wonder why it was done this way? - It's to account for [heterogeneous enums](https://2ality.com/2020/01/typescript-enums.html#heterogeneous-enums).

Taking a look at the JS reveals:

```js
var Test;
(function (Test) {
  Test[(Test["Hello"] = 0)] = "Hello";
  Test[(Test["World"] = 1)] = "World";
})(Test || (Test = {}));
```

Shows an immediately invoked function execution with some stuff going on in while indexing `Test`, lets break that down:

- `Test` is defined but no value is assigned
- An Immediately-Invoked Function Expression is called with the following
  - `Test || (Test = {})`
  - `Test` is undefined so the `||` operator evaluates `(Test = {})`
  - `Test` (the var) is assigned a value of `{}`
    - [The value of the assignment is returned, so our IIFE is supplied with `{}` as its argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment)

Ok, so now the state of the application looks like this

```js
var Test; // {}
Test[(Test["Hello"] = 0)] = "Hello";
Test[(Test["World"] = 1)] = "World";
```

Now for the indexing part:

- `Test[Test["Hello"] = 0] = "Hello";`, lets eval the indexing first
  - `Test["Hello"]` is assigned a value of zero, and the assignment is returned, 0
    - `Test = { Hello = 0 }`
  - `Test[0] = "Hello"`
    - `Test = { Hello = 0, 0 = "Hello" }`
  - And same for the next one:
  - `Test[Test["World"] = 1] = "World";`
    - `Test["World"] = 1`
    - `Test = { Hello = 0, 0 = "Hello", World = 1 }`
  - `Test[1] = "World"`
    - `Test = { Hello: 0, 0: "Hello", World: 1, 1: "World" }`

And hence we end up with:

```
var Test = {
  Hello: 0,
  0: "Hello",
  World: 1,
  1: "World"
}
```

Which fully explains why there are 4 values in our `.entries()` - a bit of an annoying gotcha & I imagine its taken a few people on a ride around in circles figuring it out.

## Better enums

A slightly better way would be to only use string enums as the twice indexing issue is only when using numbers as a value:

```ts
enum Test {
  Hello = "Foo",
  World = "Bar",
}

Object.keys(Test); // ["Hello", "World"]
Object.values(Test); // ["Foo", "Bar"]
Object.entries(Test); // [["Hello", "Foo"], ["World", "Bar"]]

// transpiled...
var Test;
(function (Test) {
  Test["Hello"] = "Foo";
  Test["World"] = "Bar"; // no duplicates
})(Test || (Test = {}));
```

## Extending enums

It's also not possible to extends enums in the sense of `interface X implements Y` - there's a couple of work arounds like this one on [StackOverflow](https://stackoverflow.com/a/64549988) which work I guess.

```ts
enum Color1 {
  Red = "Red",
  Green = "Green",
}

enum Color2 {
  Yellow = "Yellow",
  Blue = "Blue",
}

type Colors = Color1 | Color2;

const Colors = { ...Color2, ...Color1 };
this.color = Colors.Red; // Colors.Green or Colors.Yellow or Colors.Blue
```

But still you have the same issue with repeated indexes - so not a full solution.

## An alternative

More recently I've been cozying up to this method of handling enums, though you lose the explicit `SomeEnum.Value`, assuming everything is typed correctly you'll have no issue with iterating & extending with both strings & numbers.

```ts
const Colors1 = ["Red", "Green", 1, 2] as const;
const Colors2 = ["Yellow", "Blue", 3, 4] as const;

// Get values as a union
type Color1 = typeof Colors1[number];
type Color2 = typeof Colors2[number];

// Combine both enums into one
const Colors = [...Colors1, ...Colors2] as const;
type Color = typeof Colors[number];

Colors.forEach((c) => console.log(c)); // "Red", "Green", 1, 2 "Yellow", "Blue", 3, 4;
let x: Color; // "Red" | "Green" | 1 | 2 | "Yellow" | "Blue" | 3, | 4;
```

thanks for coming to my ted talk.
