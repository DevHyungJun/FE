"use client";

import { Button, Input } from "@nextui-org/react";
import { FormProvider, useForm } from "react-hook-form";
import { passwordV, passwordConfirmV } from "../validationRules";
import { SignupForm } from "@/types/signupForm";
import { IoPersonAddOutline } from "react-icons/io5";
import GenderSelect from "./components/GenderSelect";
import GenerationSelect from "./components/GenerationSelect";
import EmailInputWithSend from "./components/EmailInputWithSend";
import EmailConfirmInput from "./components/EmailConfirmInput";
import UsernameInputWithCheck from "./components/UsernameInputWithCheck";
import FormErrorMessage from "./components/FormErrorMessage";
import useSignupSubmit from "./hooks/useSignupSubmit";
import useSendMailTimerConfirm from "./hooks/useSendMailTimerConfirm";
import useGenderGeneration from "./hooks/useGenderGeneration";
import useUsernameConfirm from "./hooks/useUsernameConfirm";

const Signup = () => {
  const method = useForm<SignupForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = method;

  const { gender, setGender, generation, setGeneration } =
    useGenderGeneration();
  const { usernameCheck, handleUsernameCheck } = useUsernameConfirm(
    trigger,
    getValues
  );
  const {
    handleMailConfirm,
    handleSendMail,
    sendMail,
    confirmMail,
    countdown,
    expiredMessage,
    formatTimeCallback,
  } = useSendMailTimerConfirm(trigger, getValues);
  const { onSubmit, signup } = useSignupSubmit(
    confirmMail,
    usernameCheck,
    gender,
    generation
  );

  return (
    <div className="min-h-[calc(100vh-333px)] sm:min-h-[calc(100vh-502px)] md:min-h-[calc(100vh-330px)] flex items-center justify-center text-gray-800">
      <FormProvider {...method}>
        <form
          className="flex flex-col w-[500px] mx-auto gap-3 shadow-none p-3 rounded-md sm:shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-2 text-2xl extra-bold m-1">
            <IoPersonAddOutline />
            회원가입
          </div>
          <EmailInputWithSend
            isDisabled={confirmMail.isSuccess}
            isLoading={sendMail.isPending}
            onSend={handleSendMail}
          />
          <EmailConfirmInput
            confirmMail={confirmMail}
            onConfirm={handleMailConfirm}
            countdown={countdown}
            expiredMessage={expiredMessage}
            formatTime={formatTimeCallback}
          />
          <UsernameInputWithCheck
            isLoading={usernameCheck.isPending}
            onCheck={handleUsernameCheck}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            variant="underlined"
            required
            isClearable
            className="font-sans"
            {...register("password", passwordV)}
          />
          <FormErrorMessage errors={errors} name="password" />
          <Input
            type="password"
            placeholder="비밀번호 확인"
            variant="underlined"
            required
            isClearable
            className="font-sans"
            {...register("passwordConfirm", passwordConfirmV)}
          />
          <FormErrorMessage errors={errors} name="passwordConfirm" />
          <GenderSelect gender={gender} setGender={setGender} />
          <GenerationSelect
            generation={generation}
            setGeneration={setGeneration}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              color="primary"
              isLoading={signup.isPending}
              className="bold"
            >
              회원가입
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Signup;
