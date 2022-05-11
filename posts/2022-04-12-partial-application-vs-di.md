---
title: Partial Application vs DI
date: 2022-04-10T20:47:00
draft: true
---

## Partial Application

```ts
type UserDataService = {
  findUser: (userId: number) => Promise<User | null>;
  createUser: (name: string) => Promise<User>;
};

const PrismaDataService = (prisma: PrismaClient): UserDataService => ({
  findUser: (userId) => prisma.users.findUnique({ where: { userId } }),
  createUser: (data) => prisma.users.create({ data }),
});

const prisma = new PrismaClient();

const userDataService = PrismaDataService(prisma);

const user = await userDataService.createUser({ name: "cass" });

const foundUser = await userDataService.findUser(user.id);
if (foundUser) console.log(foundUser.name); // "cass"
```

### Reader monad

<https://dev.to/choc13/grokking-the-reader-monad-4f45>

## DI
