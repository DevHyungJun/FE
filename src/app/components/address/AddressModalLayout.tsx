"use client";

import { IoClose, IoArrowBack } from "react-icons/io5";

interface AddressModalLayoutProps {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  children: React.ReactNode;
}

export default function AddressModalLayout({
  title,
  onClose,
  onBack,
  children,
}: AddressModalLayoutProps) {
  return (
    <div className="fixed p-0 sm:p-1 inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative overflow-y-auto w-full sm:w-[800px] h-full rounded-none sm:min-h-[443px] sm:max-h-[600px] p-3 bg-white z-10 sm:rounded-lg">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h1 className="text-lg font-semibold mb-5">{title}</h1>
            <div className="flex items-center gap-2 text-2xl">
              {onBack && (
                <button onClick={onBack}>
                  <IoArrowBack />
                </button>
              )}
              <button onClick={onClose}>
                <IoClose />
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
