---
title: VC money + DSLs = ❤️
date: 2022-05-08T13:31:00
---

The rationale for startups like [Terraform](https://www.terraform.io) and
[Prisma](https://www.prisma.io) creating their own
[Domain Specific Language](https://en.wikipedia.org/wiki/Domain-specific_language),
is fairly straightforward. They have a product that they want to have the
broadest developer appeal, whilst having the shortest possible time-to-market,
all the while having neither the time nor resource to create/maintain
per-language implementations that can cover everything that their product aims
to provide.

As developers we sort of put up with this kind of thing, mainly because we're
also under the same spectrum of pressures - having to learn the next new thing &
accept a bit more vendor lock-in is worth it for the time/money/effort savings
in the corporate context, after all, do you really think management care about
the elegance of your ORM?

This pressure & general startup culture has inspired a whole wave of VC money
targeted at products aimed at developers to aid in building products,
meta-products if you will. (On of the more absurd examples of this is
[warp.dev](https://www.warp.dev), who recently received
[**$23 million** in funding](https://techcrunch.com/2022/04/05/warp-raises-23m-to-build-a-better-terminal/)...for
a terminal...not like those don't already exist but ok... )

Anyways, back onto DSLs...

Terraform for example uses the HashiCorp Language (HCL). Sure, managing infra
with it is an absolute breeze, but things like managing environments results in
a lot of copy-pasting, or validating input values is somewhat difficult due to
limitations in the language - all of which could be solved by having a non-DSL
implementation

A result of these limitations is that a whole ecosystem of "meta-meta-products"
is written into existence up by the open-source community, willing to pick up
the slack of these companies whose priorities are placed elsewhere than DX, i.e.
making more cash-cash-money for their VC overlords

Some Terraform meta-meta-products:

- [Terragrunt](https://terragrunt.gruntwork.io) which is pretty much some nice
  CLI tooling for code-genning Terraform
- [Terraspace](https://terraspace.cloud) more codegen, but more opinionated

An example of a basic missing feature in HCL: validation & raising errors,
given:

> "I want to limit my `terraform.workspace` value to be one of: `prod`,
> `staging` or `dev`

In a general-purpose language (GPL) this would be trivial:

```typescript
if (!["prod", "staging", "dev"].includes(terraform.workspace))
  throw new Error("Invalid workspace value");
```

in HCL, due the language not having any mechanism to raise errors, we have to
abuse it:

```hcl
resource "null_resource" "workspace_value_check" {
  // Expects number, but we'll give it a string in the event of no matches
  // which'll stop the generation with an error
  count =
    (terraform.workspace == "prod" ? 0 :
    (terraform.workspace == "staging" ? 0 :
    (terraform.workspace == "dev" ? 0 : "Bad core/workspace selection")))
}
```

200 other people seemingly came across the same issue, and went to enough effort
to find this
[GH issue from 2017](https://github.com/hashicorp/terraform/issues/15469) &
upvote it

## Prisma

Prisma has a similar problem.

Anyone whose ever written a non-trivial amount of Prisma will soon think some
variation of the following thought:

> "ok I wanna split my big ass schema apart"

One then goes over to the documentation to be met with deafening silence on the
topic... onto Github to search through the issues you'll find this:

<https://github.com/prisma/prisma/issues/2377>

Prisma have definitely made a nice product, there's no doubt about that,
strongly typed ORMs have been needed in the Node community for a long time, and
they've wiped the floor with Sequlize, TypeORM, MikroORM et al. It's a bit of a
let down, especially with a company whose product seemingly revolves around DX,
to not have something so fundamental, and then additionally ignore the wishes of
their community for several years kind of fucks me off

Same as Terraform, a couple of meta-products that stitch together Prisma files
by effectively `cat`ing them together have come up:
[prisma-aurora](https://www.npmjs.com/package/prisma-aurora) and
[prismix](https://www.npmjs.com/package/prismix)

## Missing the point

[Pulumi](https://www.pulumi.com) got it right the first time when making their
IaC tooling, GPL implementations across 6 languages, I would honestly prefer a
startup to release their MVP in a common language like TypeScript, than be
gimped by a limited DSL, with more language support promised in the future

At the end of the day these DSLs are a by-product of startup MVP culture that
values TTM over all else, they take the position of if they can get something
into the hands of developers as fast as humanely possible, they can validate
their assumptions. Which is totally fine... I just hope that at some point with
all the VC money they invest the time into making a good SDK & we can all live
happily every after

The good news is that seems to be happening, Terraform recently released their
[CDK for TypeScript](https://www.hashicorp.com/blog/cdk-for-terraform-enabling-python-and-typescript-support),
Prisma is almost certain to follow suite, but until then it's
[refract](https://github.com/cwqt/refract) all the way down 💎
