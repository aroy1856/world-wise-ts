import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import type { Booking, BookingWithRelations } from "./types";

interface GetAllBookingsFilter {
  field: string;
  value: string;
  method?: "eq" | "gte" | "lte";
}

interface GetAllBookingsSort {
  field: string;
  direction: "asc" | "desc";
}

interface GetAllBookingsParams {
  filter?: GetAllBookingsFilter | null;
  sort?: GetAllBookingsSort | null;
  page?: number;
}

interface GetAllBookingsResult {
  data: BookingWithRelations[];
  count: number | null;
}

export async function getAllBookings({
  filter,
  sort,
  page,
}: GetAllBookingsParams): Promise<GetAllBookingsResult> {
  let query = supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)", { count: "exact" });

  if (filter) {
    const method = filter.method || "eq";
    if (method === "eq") {
      query = query.eq(filter.field, filter.value);
    } else if (method === "gte") {
      query = query.gte(filter.field, filter.value);
    } else if (method === "lte") {
      query = query.lte(filter.field, filter.value);
    }
  }

  if (sort)
    query = query.order(sort.field, { ascending: sort.direction === "asc" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) {
    console.log(error.message);
  }

  return { data: (data ?? []) as BookingWithRelations[], count };
}

export async function getBooking(id: number | string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  console.log(data);

  return data as BookingWithRelations;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as {
    created_at: string;
    totalPrice: number;
    extrasPrice: number;
  }[];
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as (Booking & { guests: { fullName: string } })[];
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data as (Booking & {
    guests: {
      fullName: string;
      nationality: string;
      countryFlag: string;
    };
  })[];
}

export async function updateBooking(id: string, obj: object) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: string) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
