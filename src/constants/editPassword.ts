import { passwordV, passwordConfirmV } from "@/app/validationRules";
import { EditPasswordForm } from "@/types/editPassword";

export const passwordInputObject: {
  label: string;
  validation?: any;
  register: keyof EditPasswordForm;
  type: string;
}[] = [
  {
    label: "기존 비밀번호를 입력해주세요",
    register: "old_password",
    type: "password",
  },
  {
    label: "새 비밀번호를 입력해주세요",
    register: "password",
    validation: passwordV,
    type: "password",
  },
  {
    label: "새 비밀번호를 다시 입력해주세요",
    register: "new_password_confirm",
    validation: passwordConfirmV,
    type: "password",
  },
];
