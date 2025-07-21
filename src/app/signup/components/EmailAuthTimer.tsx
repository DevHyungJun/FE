import { ERROR_MESSAGES } from "@/constants/signup";

interface EmailAuthTimerProps {
  countdown: number | null;
  expiredMessage: boolean;
  formatTime: (second: number | null) => string | undefined;
}

export default function EmailAuthTimer({
  countdown,
  expiredMessage,
  formatTime,
}: EmailAuthTimerProps) {
  return (
    <>
      <p className="text-sm text-yellow-500 m-1">{formatTime(countdown)}</p>
      {expiredMessage && (
        <p className="text-sm text-red-500">{ERROR_MESSAGES.expiredAuth}</p>
      )}
    </>
  );
}
