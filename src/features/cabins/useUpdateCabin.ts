import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import type { CabinInsert } from "../../services/types";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ cabin, editId }: { cabin: CabinInsert; editId: string }) =>
      createOrEditCabin(cabin, editId),
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin: updateCabin, isEditing: isUpdating };
}
