import { IoClose, IoArrowBack } from "react-icons/io5";
import DaumPostcodeEmbed from "react-daum-postcode";
import { storeModalShowstep } from "@/store";
import { storeAddressData } from "@/store";

const DaumPost = () => {
  const { setStep, decrementStep } = storeModalShowstep();
  const { addressData, setAddressData } = storeAddressData();

  const handleCompleted = (data: any) => {
    setAddressData({
      ...addressData,
      main_address: data.sido,
      detail_address: `${data.sigungu} ${data.bname}`,
      zip_code: data.zonecode
    });
    setStep(2);
  };

  return (
    <div className="fixed p-1 inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setStep(0)} />
      <div className="relative overflow-y-auto w-[800px] min-h-[443px] max-h-[600px] p-3 bg-white z-10 rounded-lg">
        <div className="flex justify-end items-center gap-2 mb-5">
          <button>
            <IoArrowBack className="text-2xl" onClick={() => setStep(2)} />
          </button>
          <button>
            <IoClose className="text-2xl" onClick={decrementStep} />
          </button>
        </div>
        <DaumPostcodeEmbed onComplete={handleCompleted} style={{ height: '443px' }} />
      </div>
    </div>
  )
};

export default DaumPost;