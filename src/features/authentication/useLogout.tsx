import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isPending,
    mutate: logout,
    error,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, logout, error };
}
