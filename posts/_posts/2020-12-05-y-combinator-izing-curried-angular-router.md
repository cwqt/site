---
layout: post
date: 2020-12-05 16:03:55 +0000
comments: true
title: y-combinator-izing curried angular router

---

i've recently gone a bit mad with wanting to turn everything i touch into functional code & this being my latest foray, a thing that creates a flat routing structure from nested functions and stuff:

![](https://ftp.cass.si/97=rv9tn0.png)

from this code

```ts
const APP_ROUTES:Routes = new AppRouter()
  .register(``,                                         FeedComponent,             LoggedInGuard)
  .register(`watch`,                                    PerformanceWatchComponent, LoggedInGuard)
  .register(`search`,                                   CatalogComponent,          LoggedInGuard)
  .register(`verified`,                                 VerifiedComponent)
  .register(`user/@:${RP.UserId}`,                      ProfileComponent,          LoggedInGuard)
  .register(`performance/:${RP.PerformanceId}`,         PerformanceComponent,      LoggedInGuard)
  .pushRouter(r => r.register(`host/@:${RP.HostId}`,    HostComponent, LoggedInGuard))
    .register(`performances`,                           HostPerformancesComponent, LoggedInGuard)
    .pushRouter(r => r.register(`:${RP.PerformanceId}`, HostPerformancesComponent, LoggedInGuard))
      .register(`watch`,                                HostPerformancesComponent, LoggedInGuard)
    .popRouter()
  .popRouter()
  .register(`ui`,                                       TestbedComponent)
  .apply();
```

all the fp goodness man could ever wish for, i mean look at that supple tree...and the y-combinator itself you may ask?

```ts
export default class AppRouter {
  // ...

  apply():Routes {
    return Y((r:(x:AppRouter) => Routes) => n => {
      return [
        ...n.routes.map(rs => ({ ...rs, path: n.root + rs.path })),
        ...(n.routers.reduce((acc, curr) => {
          // omgggg
          return [...acc, ...r(curr)];
        }, [])),
      ];
    })(this);
  }
}
```

gone are the days of stupid objects and arrays
