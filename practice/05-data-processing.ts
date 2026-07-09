/* ============================================================
   EXERCISE 5 — Real data processing (group-by / latest-wins)
   Difficulty: ⭐⭐⭐  (this is a VERY common interview task)
   Run:  npx tsx practice/05-data-processing.ts
   ============================================================ */
import { assert } from "./_check";

interface OrderEvent {
  orderId: string;
  status: "placed" | "shipped" | "delivered" | "cancelled";
  timestamp: number;
}

// TODO 5a: `latestStatus` — return a Record mapping each orderId to its
//   MOST RECENT event (highest timestamp). Type the return as
//   Record<string, OrderEvent>.

function latestStatus(events: OrderEvent[]): Record<string, OrderEvent> {
  return events.reduce((acc, event) => {
    acc[event.orderId] = event;
    if(acc[event.orderId].timestamp < event.timestamp){
      acc[event.orderId] = event;
    }
    return acc;
  }, {} as Record<string, OrderEvent>);
}

// TODO 5b: `countByStatus` — return how many orders are CURRENTLY in each status,
//   based on each order's latest event. Return Record<string, number>.
//   (Hint: reuse latestStatus.)

function countByStatus(events:OrderEvent[]): Record<string, number>{
  const latest = latestStatus(events);
  return Object.values(latest).reduce(
    (acc, event)=>{
      acc[event.status] = (acc[event.status] | 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  )
}


// ---- self-check (uncomment when ready) ----
const events: OrderEvent[] = [
  { orderId: "A", status: "placed", timestamp: 1 },
  { orderId: "A", status: "shipped", timestamp: 5 },
  { orderId: "B", status: "placed", timestamp: 2 },
  { orderId: "A", status: "delivered", timestamp: 9 },
  { orderId: "B", status: "cancelled", timestamp: 3 },
];
assert(
  latestStatus(events)["A"].status === "delivered",
  "A's latest is delivered " + JSON.stringify(latestStatus(events)["A"]),
);
assert(
  latestStatus(events)["B"].status === "cancelled",
  "B's latest is cancelled",
);
console.log(latestStatus(events));
const counts = countByStatus(events);
console.log(counts);
assert(counts["delivered"] === 1, "1 delivered order");
assert(counts["cancelled"] === 1, "1 cancelled order");
assert(
  counts["placed"] === undefined || counts["placed"] === 0,
  "no orders still 'placed'",
);

export {};
