import { IoMdMan, IoMdWoman } from "react-icons/io";

interface GenderSelectProps {
  gender: string;
  setGender: (gender: string) => void;
}

export default function GenderSelect({ gender, setGender }: GenderSelectProps) {
  return (
    <div className="flex gap-2 mb-5 bold">
      <div
        className={`flex items-center border ${
          gender === "man" && "bg-blue-100"
        } p-2 rounded-md text-gray-900 select-none cursor-pointer`}
        onClick={() => setGender("man")}
      >
        남성
        <IoMdMan className="text-2xl text-blue-500" />
      </div>
      <div
        className={`flex items-center border ${
          gender === "woman" && "bg-pink-100"
        } p-2 rounded-md text-gray-900 select-none cursor-pointer`}
        onClick={() => setGender("woman")}
      >
        여성 <IoMdWoman className="text-2xl text-pink-500" />
      </div>
    </div>
  );
}
