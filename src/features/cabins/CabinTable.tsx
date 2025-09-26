import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { cabins, isPending, error } = useCabins();
  const [searchParams] = useSearchParams();

  const discount = searchParams.get("discount");
  const sortBy = searchParams.get("sortBy") || "created_at-asc";
  const [sortField, sortDirection] = sortBy.split("-") || [];

  if (isPending) return <Spinner />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  let filteredCabins = cabins;
  if (discount === "with-discount") {
    filteredCabins = cabins?.filter((cabin) => (cabin?.discount ?? 0) > 0);
  } else if (discount === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => (cabin?.discount ?? 0) === 0);
  }

  const sortedCabins = filteredCabins?.sort((a, b) => {
    const aValue = a[sortField as keyof typeof a] as number;
    const bValue = b[sortField as keyof typeof b] as number;
    const modifier = sortDirection === "asc" ? 1 : -1;
    return (aValue - bValue) * modifier;
  });

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={sortedCabins || []}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}
