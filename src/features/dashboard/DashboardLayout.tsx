import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isPending: isBokkingLoading, days } = useRecentBookings();
  const { confirmedStays, isPending: isLoadingStays } = useRecentStays();
  const { cabins, isPending } = useCabins();

  if (isBokkingLoading || isPending || isLoadingStays) return <Spinner />;
  console.log(bookings);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings || []}
        confirmedStays={confirmedStays || []}
        cabinCount={cabins?.length || 0}
        numDays={days}
      />
      <div>bar</div>
      <div>graph</div>
    </StyledDashboardLayout>
  );
}
