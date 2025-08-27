import { ERROR_MESSAGES } from "@/constants/signup";
import useSignup from "@/hooks/useSignup";
import { ConfirmMail } from "@/types/signupConfirmMail";
import { SignupForm } from "@/types/signupForm";
import { UseMutationResult } from "@tanstack/react-query";
import Swal from "sweetalert2";

const useSignupSubmit = (
  confirmMail: UseMutationResult<any, Error, ConfirmMail, unknown>,
  usernameCheck: UseMutationResult<any, Error, string, unknown>,
  gender: string,
  generation: string
) => {
  const signup = useSignup();

  const onSubmit = (formData: SignupForm) => {
    const isFormValid =
      confirmMail.isSuccess &&
      usernameCheck.isSuccess &&
      gender !== "" &&
      generation !== "";
    if (!isFormValid) {
      Swal.fire({
        icon: "error",
        title: ERROR_MESSAGES.signupFail,
        text: ERROR_MESSAGES.requiredAll,
      });
      return;
    }
    const { email, password, username } = formData;
    signup.mutate({
      email,
      password,
      username,
      gender,
      generation: Number(generation),
    });
  };

  return {
    onSubmit,
    signup,
  };
};

export default useSignupSubmit;
