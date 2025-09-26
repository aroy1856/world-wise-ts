import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const {
    mutate: signUp,
    isPending: isSigningIp,
    error,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account created successfuly. Please verify the email address"
      );
    },
  });

  return { signUp, isSigningIp, error };
}
