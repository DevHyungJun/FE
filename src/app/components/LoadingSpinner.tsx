import { Spinner } from "@nextui-org/react";

export default function LoadingSpinner() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Spinner size="lg" label="Loading..." />
    </div>
  );
}