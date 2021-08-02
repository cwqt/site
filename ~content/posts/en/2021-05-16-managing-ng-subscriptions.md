+++
parent = "post.html"
date = 2021-05-16T11:48:00Z
comments = true
draft = false
title = "managing ng subscriptions"
+++

it's commonly taught to newbies that cleaning up your subscriptions is necessary to avoid memory leaks in your angular app, so here's a couple ways to do that without too much hassle:

## 1, single subscription

```ts
private _subscription:Subscription;

ngOnInit() {
  this._subscription = of([]).subscribe(v => {});
}

ngOnDestroy() {
  this._subscription.unsubscribe();
}
```

is fine for a single subscription, but i don't like how its coupled

# 2, many subscriptions

```ts
private _subscriptions:Subscription[] = [];
public value:Observable<any> = of([]);

ngOnInit() {
  this._subscriptions.push(this.value.subscribe(v => {}));
  this._subscriptions.push(this.value.subscribe(v => {}));
}

ngOnDestroy() {
  this._subscriptions.forEach(s => s.unsubscribe());
}
```

bad, not a fan, `.push` -- ew

# 3, the good way

here we invert the control & tell all the subscriptions to stop through emitting an event<br/>
this is my favorite method :)

```ts
private _unsubscribe = new Subject<void>();
public value:Observable<any> = of([]);

ngOnInit() {
  this.value.pipe(takeUntil(this._unsubscribe).subscribe(v => {}); // once _unsubscribe is applied, stop the listener
  this.value.pipe(takeUntil(this._unsubscribe).subscribe(v => {});
}

ngOnDestroy() {
  this._unsubscribe.next();
  this._unsubscribe.complete();
}
```
