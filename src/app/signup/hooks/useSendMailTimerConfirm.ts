import { EMAIL_AUTH_TIME_SEC } from "@/constants/signup";
import useConfirmMail from "@/hooks/useConfirmMail";
import useSendMail from "@/hooks/useSendMail";
import { SignupForm } from "@/types/signupForm";
import formatTime from "@/util/formatTime";
import { useCallback, useEffect, useState } from "react";
import { UseFormGetValues, UseFormTrigger } from "react-hook-form";

const useSendMailTimerConfirm = (
  trigger: UseFormTrigger<SignupForm>,
  getValues: UseFormGetValues<SignupForm>
) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [expiredMessage, setExpiredMessage] = useState(false);
  const sendMail = useSendMail();
  const confirmMail = useConfirmMail();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev! - 1), 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setExpiredMessage(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendMail = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      const emailValue = getValues("email");
      sendMail.mutate(emailValue, {
        onSuccess: () => {
          setCountdown(EMAIL_AUTH_TIME_SEC);
          setExpiredMessage(false);
        },
      });
    }
  };

  const handleMailConfirm = async () => {
    const isValid = await trigger("emailConfirm");
    if (isValid) {
      const email = getValues("email");
      const emailCode = getValues("emailConfirm").trim();
      confirmMail.mutate(
        { email, emailCode },
        {
          onSuccess: () => {
            setCountdown(null);
            setExpiredMessage(false);
          },
        }
      );
    }
  };

  const formatTimeCallback = useCallback(formatTime, []);

  return {
    confirmMail,
    sendMail,
    handleSendMail,
    handleMailConfirm,
    countdown,
    expiredMessage,
    formatTimeCallback,
  };
};

export default useSendMailTimerConfirm;
