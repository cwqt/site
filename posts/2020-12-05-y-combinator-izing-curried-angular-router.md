---
title: "y-combinator-izing curried angular router"
date: 2020-12-05T16:03:55Z
---

i've recently gone a bit mad with wanting to turn everything i touch into
functional code & this being my latest foray, a thing that creates a flat
routing structure from nested functions and stuff:

![](https://ftp.cass.si/97=rv9tn0.png)

from this code

<!-- prettier-ignore -->
```ts
const APP_ROUTES: Routes = new AppRouter()
  .register(``, FeedComponent, LoggedInGuard)
  .register(`watch`, PerformanceWatchComponent, LoggedInGuard)
  .register(`search`, CatalogComponent, LoggedInGuard)
  .register(`verified`, VerifiedComponent)
  .register(`user/@:${RP.UserId}`, ProfileComponent, LoggedInGuard)
  .register(`performance/:${RP.PerformanceId}`, PerformanceComponent, LoggedInGuard)
    .push((r) => r.register(`host/@:${RP.HostId}`, HostComponent, LoggedInGuard))
      .register(`performances`, HostPerformancesComponent, LoggedInGuard)
      .push((r) => r.register(`:${RP.PerformanceId}`, HostPerformancesComponent, LoggedInGuard))
      .register(`watch`, HostPerformancesComponent, LoggedInGuard)
      .pop()
    .pop()
  .register(`ui`, TestbedComponent)
  .apply();
```

all the fp goodness man could ever wish for, i mean look at that supple
tree...and the y-combinator itself you may ask?

```ts
export default class AppRouter {
  // ...

  apply(): Routes {
    return Y((r: (x: AppRouter) => Routes) => (n) => [
      ...n.routes.map((rs) => ({ ...rs, path: n.root + rs.path })),
      ...n.routers.reduce(
        (acc, curr) =>
          // omgggg
          [...acc, ...r(curr)],
        []
      ),
    ])(this);
  }
}
```

gone are the days of stupid objects and arrays
