import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryclient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("Account updated successfuly.");
      queryclient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { updateUser, isUpdating, error };
}
