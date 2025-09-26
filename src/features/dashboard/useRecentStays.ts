import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const days = searchParams.get("last") ? Number(searchParams.get("last")) : 7;
  const fromDate = subDays(new Date(), days).toISOString();

  const {
    data: stays,
    isPending,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(fromDate),
    queryKey: ["stays", `recent-${days}-days`],
  });

  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");

  return { isPending, stays, confirmedStays, error };
}
