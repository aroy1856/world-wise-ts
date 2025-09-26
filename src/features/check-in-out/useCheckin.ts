import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isPending,
    mutate: checkin,
    error,
  } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: string;
      breakfast: object;
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, checkin, error };
}
