---
title: "Polymorphic TypeORM strats"
date: 2021-04-06T18:40:00Z
---

> To preface I no longer recommend using TypeORM, [it's pretty dead](https://github.com/typeorm/typeorm/issues/3267) & there are one [too](https://github.com/typeorm/typeorm/issues/3357) [many](https://github.com/typeorm/typeorm/issues/400) [issues](https://github.com/typeorm/typeorm/issues/4742) to deal with - though I'm using it in production if I could go back in time I'd totally use something else, [Prisma](https://www.prisma.io/) looks pretty sweet though so check that out

# polymorphic joins

simplest but not the best in terms of data integrity because no fk constraint, uses 2 columns for an entity type & \_id

```ts
@Entity()
export class Invoice extends BaseEntity {
  @Column() obj_type: "ticket" | "merch" | "patron";
  @Column() obj_id: string;
}
```

downside is needing two queries to get the items you want / search

```ts
const invoices = await Invoice.find({ type: "ticket" });
const tickets = Ticket.find({ _id: In(invoices.map((i) => i._id)) });
```

# table per type

```sql
create table invoice_ticket (
  invoice_id integer not null unique references invoice,
  ticket_id integer not unique null references ticket
);

create table invoice_merch (
  invoice_id integer not null unique references invoice,
  merch_id integer not null unique references merch
);
```

# column per type

keeps fk but no guarantee entity doesn't have more than one relation, can do nested queries

```ts
@Entity()
export class Invoice extends BaseEntity {
  @ManyToOne(() => Ticket) ticket: Ticket;
  @ManyToOne(() => Merch) merch: Merch;
  @ManyToOne(() => Patron) patron: Patron;

  get data() {
    return [this.ticket, this.merch, this.patron].find((e) => e !== undefined);
  }
}
```

```ts
const tickets = await Invoice.find({
  where: { ticket: { price: 10 } },
  relations: ["ticket"],
  select: { ticket: { _id: true, price: true } },
}).map((i) => i.ticket);
```
