import { DataTable } from "../components/dataTable/DataTable";
import { columns, Payment } from "../lib/data-table-columns/test-columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function Home() {
  const data = await getData()
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
