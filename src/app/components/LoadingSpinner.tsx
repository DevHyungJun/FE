import { Spinner } from "@nextui-org/react";

export default function LoadingSpinner({mode = 'default'}: {mode?: string}) {
  const hMode = mode === 'default' ? 'h-screen' : 'h-10 m-3';

  return (
    <div className={`flex ${hMode} justify-center items-center`}>
      <Spinner size="lg" />
    </div>
  );
};