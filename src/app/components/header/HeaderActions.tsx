import { NavbarContent, NavbarItem } from "@nextui-org/react";
import useLoginLogout from "./hooks/useLoginLogout";
import useSignupMypage from "./hooks/useSignupMypage";
import useIsLoggedIn from "./hooks/useIsLoggedIn";
import useGetProfileImage from "./hooks/useGetProfileImage";
import useSearchPathname from "./hooks/useSearchPathname";
import GetIconComponent from "./GetIconComponent";

export default function HeaderActions() {
  const { isLoggedIn } = useIsLoggedIn();
  const { handleLoginLogout } = useLoginLogout();
  const { handleSignupMypage } = useSignupMypage();
  const { profileImage } = useGetProfileImage();
  const { isLoginOpen, isMypageOpen, isSignupOpen } = useSearchPathname();

  return (
    <NavbarContent justify="end">
      <NavbarItem
        className={`hidden sm:flex cursor-pointer text-sm hover:text-blue-500 ${
          isLoginOpen ? "bold" : ""
        }`}
        onClick={() => handleLoginLogout(isLoggedIn)}
      >
        {!Boolean(isLoggedIn) ? (
          <div className="flex items-center gap-1">
            <GetIconComponent iconType="login" className="text-lg" />
            로그인
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <GetIconComponent iconType="logout" className="text-lg" />
            로그아웃
          </div>
        )}
      </NavbarItem>
      <NavbarItem
        className={`hidden sm:flex cursor-pointer text-sm hover:text-blue-500 ${
          isSignupOpen || isMypageOpen ? "bold" : ""
        }`}
        onClick={() => handleSignupMypage(isLoggedIn)}
      >
        {!Boolean(isLoggedIn) ? (
          <div className="flex items-center gap-1">
            <GetIconComponent iconType="person-add" className="text-lg" />
            회원가입
          </div>
        ) : (
          <div className="w-[115.56px] flex items-center gap-2">
            <GetIconComponent
              iconType="profile"
              className="text-lg"
              profileImage={profileImage}
            />
            마이페이지
          </div>
        )}
      </NavbarItem>
    </NavbarContent>
  );
}
