import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isPending,
    mutate: checkout,
    error,
  } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, checkout, error };
}
