import { Suspense } from "react";
import { DataTable } from "../components/data-table/DataTable";
import {
  columnFilters,
  columns,
  Payment,
} from "../lib/data-table-columns/test-columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "123qwe432",
      amount: 200,
      status: "pending",
      email: "ala@example.com",
    },
    {
      id: "546fvd26g",
      amount: 50,
      status: "success",
      email: "malina@example.com",
    },
    // ...
  ];
}

export default async function Home() {
  const data = await getData();

  return (
    <Suspense>
      <div className="container mx-auto py-10">
        <DataTable
          columnFilters={columnFilters}
          columns={columns}
          data={data}
        />
      </div>
    </Suspense>
  );
}
