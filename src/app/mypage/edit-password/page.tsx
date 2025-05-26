"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { passwordV, passwordConfirmV } from "@/app/validationRules";
import { ErrorMessage } from "@hookform/error-message";
import useEditPassword from "@/hooks/useEditPassword";
import useGuestOut from "@/hooks/useGuestOut";

interface EditPasswordForm {
  old_password: string;
  password: string;
  new_password_confirm: string;
}

export default function EditPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPasswordForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { mutate: editPassword, isPending } = useEditPassword();
  const handleBack = () => router.back();
  useGuestOut();
  const passwordInputObject: {
    label: string;
    validation?: any;
    register: keyof EditPasswordForm;
  }[] = [
    {
      label: "기존 비밀번호를 입력해주세요",
      register: "old_password",
    },
    {
      label: "새 비밀번호를 입력해주세요",
      register: "password",
      validation: passwordV,
    },
    {
      label: "새 비밀번호를 다시 입력해주세요",
      register: "new_password_confirm",
      validation: passwordConfirmV,
    },
  ];

  const onSubmit = (data: EditPasswordForm) => {
    if (data.password !== data.new_password_confirm) {
      Swal.fire({
        title: "새 비밀번호가 일치하지 않습니다.",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    const password = {
      old_password: data.old_password,
      new_password: data.password,
    };
    editPassword(password, {
      onSuccess: () => {
        router.replace("/");
      },
      onError: () => {
        Swal.fire({
          title: "비밀번호 변경에 실패했습니다, 다시 시도해주세요.",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      },
    });
  };

  const errorS = "text-red-500 text-sm";
  return (
    <div className="min-h-[calc(100vh-333px)] sm:min-h-[calc(100vh-502px)] md:min-h-[calc(100vh-330px)] flex items-center justify-center text-gray-800 my-1">
      <form
        className="flex flex-col w-[500px] mx-auto gap-3 shadow-none sm:shadow-md p-3 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="flex items-center gap-2 text-2xl extra-bold my-5">
          비밀번호 변경
        </h1>
        {passwordInputObject.map((input) => (
          <>
            <Input
              label={input.label}
              key={input.label}
              variant="underlined"
              type="password"
              isClearable
              {...register(input.register, input.validation || "")}
            />
            <ErrorMessage
              errors={errors}
              name={input.register}
              render={({ message }) => <p className={errorS}>{message}</p>}
            />
          </>
        ))}
        <div className="w-full flex gap-1 mt-5">
          <Button className="w-1/2 bold" onClick={handleBack}>
            취소
          </Button>
          <Button className="w-1/2 bold" color="primary" type="submit">
            비밀번호 변경
          </Button>
        </div>
      </form>
    </div>
  );
}
