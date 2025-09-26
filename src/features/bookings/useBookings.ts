import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status") || "all";
  const sortValue = searchParams.get("sortBy") || "startDate-asc";
  const page = Number(searchParams.get("page")) || 1;
  const [field, dir] = sortValue.split("-");
  const direction = dir === "asc" ? "asc" : "desc";

  const filter =
    filterValue === "all" ? null : { field: "status", value: filterValue };

  const { data, isPending, error } = useQuery({
    queryKey: ["bookings", filterValue, field, direction, page],
    queryFn: () =>
      getAllBookings({ filter, sort: { field, direction }, page: page }),
  });

  const bookings = data?.data;
  const count = data?.count;

  const pageCount = count ? Math.ceil(count / PAGE_SIZE) : 1;
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, field, direction, page + 1],
      queryFn: () =>
        getAllBookings({ filter, sort: { field, direction }, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, field, direction, page - 1],
      queryFn: () =>
        getAllBookings({ filter, sort: { field, direction }, page: page - 1 }),
    });
  }

  return { bookings, count, isPending, error };
}
