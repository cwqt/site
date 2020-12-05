---
layout: post
date: 2020-12-05 16:03:55 +0000
comments: true
title: y-combinator-izing curried angular router

---
this thing i'm about to describe creates this object-thingy

![](https://ftp.cass.si/97=rv9tn0.png)

from this code

```ts
const APP_ROUTES:Routes = new AppRouter()
  .register(``,                                         FeedComponent,             LoggedInGuard)
  .register(`search`,                                   CatalogComponent,          LoggedInGuard)
  .register(``,                                         FeedComponent,             LoggedInGuard)
  .register(`search`,                                   CatalogComponent,          LoggedInGuard)
  .register(`performance/:${RP.PerformanceId}`,         PerformanceComponent,      LoggedInGuard)
  .register(`watch`,                                    PerformanceWatchComponent, LoggedInGuard)
  .register(`user/@:${RP.UserId}`,                      ProfileComponent,          LoggedInGuard)
  .register(`verified`,                                 VerifiedComponent)
  .register(`ui`,                                       TestbedComponent, null, !Env.production)
  .pushRouter(r => r.register(`host/@:${RP.HostId}`,    HostComponent, LoggedInGuard))
    .register(`performances`,                           HostPerformancesComponent, LoggedInGuard)
    .pushRouter(r => r.register(`:${RP.PerformanceId}`, HostPerformancesComponent, LoggedInGuard))
      .register(`watch`,                                HostPerformancesComponent, LoggedInGuard)
    .popRouter()
  .popRouter()
  .apply();
```
yes thats right, all the fp goodness man could ever wish for, look at that supple tree structure...and the y-combinator itself you may ask?

```ts
export default class AppRouter {
  // ...

  apply():Routes {
    return Y((r:(x:AppRouter) => Routes) => n => {
      return [
        ...n.routes.map(rs => ({ ...rs, path: n.root + rs.path })),
        ...(n.routers.reduce((acc, curr) => {
          return [...acc, ...r(curr)];
        }, [])),
      ];
    })(this);
  }
}
```

truly a great exercise in mental masturbation