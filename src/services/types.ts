export interface Cabin {
  id: string;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export type CabinInsert = {
  id?: number | string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description?: string;
  image: File | string;
};

export type CabinUpdate = Partial<CabinInsert> & {
  id: number | string;
};

export interface Guest {
  id: string;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
}

export type GuestInsert = {
  fullName?: string;
  email?: string;
  nationalID?: string;
  nationality?: string;
  countryFlag?: string;
};

export type GuestUpdate = Partial<GuestInsert> & {
  id: number | string;
};

// Booking types
export interface Booking {
  id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: string;
  guestId: string;
}

export type BookingInsert = {
  startDate?: string;
  endDate?: string;
  numNights?: number;
  numGuests?: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice?: number;
  status?: string;
  hasBreakfast?: boolean;
  isPaid?: boolean;
  observations?: string;
  cabinId?: number | string;
  guestId?: number | string;
};

export type BookingUpdate = Partial<BookingInsert> & {
  id: number | string;
};

export interface Setting {
  id: string;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestPerBooking: number;
  breakfastPrice: number;
}

export type SettingInsertUpdate = {
  minBookingLength?: number;
  maxBookingLength?: number;
  maxGuestPerBooking?: number;
  breakfastPrice?: number;
};

export type BookingWithRelations = Booking & { cabins: Cabin } & {
  guests: Guest;
};
