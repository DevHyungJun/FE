import Link from "next/link";
import { AcmeLogo } from "../../../public/AcmeLogo";
import FooterUserLink from "./FooterUserLink";
import { footerObj } from "@/constants/footer";

const Footer = () => {
  return (
    <footer className="bg-[#252525] text-[#D6D5D6] px-4 py-8">
      <div className="hidden sm:flex max-w-[1200px] mx-auto flex-col gap-6 md:flex-row md:justify-between">
        {footerObj.map((item, index) => (
          <div key={index} className="md:w-[30%]">
            <h2 className="font-bold mb-2">{item.title}</h2>
            <p className="text-[#858585] text-sm font-light line-clamp-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="hidden sm:block max-w-[1200px] mx-auto h-px bg-[#D6D5D6] my-6"></div>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Link href="/" className="flex items-center gap-1">
          <AcmeLogo />
          <p className="font-extrabold text-inherit">SHOP</p>
        </Link>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-[#858585] font-light">
          <Link href="/products" className="md:hover:text-[#D6D5D6]">
            제품
          </Link>
          <FooterUserLink />
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:justify-between text-[#858585] text-sm mt-6">
        <p className="underline">anyshop@gmail.com</p>
        <p>Copyright © 2025 anyshop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
