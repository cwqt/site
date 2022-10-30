---
title: "better validation with higher-order functions"
date: 2020-12-26T17:59:55Z
---

> **update** I found this very nice library
> [Superstruct](https://github.com/ianstormtaylor/superstruct) which
> accomplishes everything & more what I describe in this blog post - it's pretty
> sweet :)

---

i've recently been faced with an issue of needing to validate a lot of different
types of data-structures, including nested & arrays of things in express - which
is a totally not nice - not in terms of any kind of techincal complexity but
simply sheer amount of duplication.

as an ardent proponent of the DRY principle i wielded my FP power and spent a
couple of days creating a new way of concisely expressing validation in a way
that no longer makes me want to die :)

```typescript
/** let d equal to:
 * {
 *  iso_country: "GBR",
 *  social_info: {
 *    linkedin_url: "http://linkedin.com/thissitesucks",
 *    facebook_url: "http://facebook.com/andthistoo",
 *    instagram_url: "http://instagram.com/blehhh",
 *  }
 * }
 */

return await object(d, {
  iso_country: IsISO31661Alpha3,
  social_info: (v) =>
    v
      .optional(true)
      .custom(
        single({
          linkedin_url: IsUrl,
          facebook_url: IsUrl,
          instagram_url: IsUrl,
        })
      )
      .withMessage("Some part of your social info is wrong!"),
})();
```

which will return all the relevant errors in a nested data-structure as-in in
the object.

as well as being able to be run imperatively, one can also use it as middleware
against request body, queries & params;

```typescript
{
  validators: [
    params({
      step: (v) => v.exists().toInt().isIn([1,2,3,4,5]),
    }),
    body({
      // self reference if body is an array and has no field accessor
      __this: v => v.isArray().custom(array({
        // validating arrays of objects
        param: IsString,
        message: IsString,
      }))
    })
  ],
}
```

another feature is composing validators, say for example validating an address,
one could make something like:

```typescript
type ObjectValidator<T> = { [index in keyof T]: CustomValidator };

const IAddress = (): ObjectValidator<Idless<IAddress>> => {
  return {
    city: (v)             => IsString(v, "Must provide a city"),
    iso_country_code:        ISOCountry,
    postcode:                Postcode,
    street_name: (v)      => IsString(v, "Must provide a street name"),
    street_number: (v)    => IsInt(v, "Must provide a street number"),
  };
};
```

and then use them in other validators;

```typescript
await object(d, {
  address: (v) => v.custom(single(IAddress())),
});
```
