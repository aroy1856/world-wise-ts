import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CabinInsert } from "../../services/types";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (cabin: CabinInsert) => createOrEditCabin(cabin),
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
