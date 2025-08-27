import useUsernameCheck from "@/hooks/useUsernameCheck";
import { SignupForm } from "@/types/signupForm";
import { UseFormGetValues, UseFormTrigger } from "react-hook-form";

const useUsernameConfirm = (
  trigger: UseFormTrigger<SignupForm>,
  getValues: UseFormGetValues<SignupForm>
) => {
  const usernameCheck = useUsernameCheck();

  const handleUsernameCheck = async () => {
    const isValid = await trigger("username");
    if (isValid) {
      const userName = getValues("username");
      usernameCheck.mutate(userName);
    }
  };

  return { usernameCheck, handleUsernameCheck };
};

export default useUsernameConfirm;
