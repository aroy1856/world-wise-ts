import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const days = searchParams.get("last") ? Number(searchParams.get("last")) : 7;
  const fromDate = subDays(new Date(), days).toISOString();

  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(fromDate),
    queryKey: ["booking", `recent-${days}-days`],
  });

  return { isPending, bookings, error };
}
