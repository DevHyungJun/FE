import Image from "next/image";
import {
  CiLogin,
  CiLogout,
  CiShoppingCart,
  CiShoppingTag,
} from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import { IconType } from "@/types/iconType";
import assertNeverIcon from "./utils/assertNeverIcon";

interface GetIconComponentProps {
  iconType: IconType;
  className: string;
  profileImage?: string;
}

const GetIconComponent = ({
  iconType,
  className = "text-xl",
  profileImage,
}: GetIconComponentProps) => {
  switch (iconType) {
    case "shopping-tag":
      return <CiShoppingTag className={className} />;
    case "shopping-cart":
      return <CiShoppingCart className={className} />;
    case "tools":
      return <VscTools className={className} />;
    case "login":
      return <CiLogin className={className} />;
    case "logout":
      return <CiLogout className={className} />;
    case "person-add":
      return <IoPersonAddOutline className={className} />;
    case "profile":
      return (
        <Image
          src={profileImage || "/basic_profile.png"}
          alt="Profile Image"
          width={25}
          height={25}
          className="w-[25px] h-[25px] object-cover rounded-full"
        />
      );
    default:
      return assertNeverIcon(iconType); //  누락 케이스 체크 방지
  }
};

export default GetIconComponent;
