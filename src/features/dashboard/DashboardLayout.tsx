import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isPending: isBokkingLoading } = useRecentBookings();
  const { stays, confirmedStays, isPending: isLoadingStays } = useRecentStays();

  if (isBokkingLoading || isLoadingStays) return <Spinner />;
  console.log(bookings);

  return (
    <StyledDashboardLayout>
      <div>stat</div>
      <div>bar</div>
      <div>graph</div>
    </StyledDashboardLayout>
  );
}
