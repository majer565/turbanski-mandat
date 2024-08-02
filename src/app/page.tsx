import TicketsTable from "@/components/data-table-implementation/TicketsTable";

export default async function Home() {
  return (
    <div className="container mx-auto py-10">
      <TicketsTable />
    </div>
  );
}
