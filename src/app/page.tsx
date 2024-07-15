import { QueryParams } from "../components/data-table/DataTable";
import { useQueryParamsResolver } from "../hooks/useQueryParamsResolver";
import PaymentsTable from "../lib/data-table-columns/payments-table";

//TODO:
//fix disappearing filter buttons when query changes
export default async function Home({
  searchParams,
}: {
  searchParams?: QueryParams;
}) {
  const { p, ps, sort, filter } = useQueryParamsResolver(searchParams);

  return (
    <div className="container mx-auto py-10">
      <PaymentsTable page={p} pageSize={ps} sort={sort} filter={filter} />
    </div>
  );
}
