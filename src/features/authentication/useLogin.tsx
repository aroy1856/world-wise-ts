import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isPending,
    data,
    mutate: login,
    error,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success(
        data.user.user_metadata["full_name"]
          ? `Welcome ${data.user.user_metadata["full_name"]}`
          : "Login successful"
      );
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, data, error, login };
}
