"use client";

import {
  Button,
  Select,
  SelectItem,
  Textarea,
  Input,
  Checkbox,
} from "@nextui-org/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { storeModalShowstep } from "@/store";
import { DELIVERY_OPTIONS } from "@/constants/address";
import { AddressData } from "@/types/address";
import useAddressForm from "./hooks/useAddressForm";

interface AddressFormProps {
  onSubmit: SubmitHandler<AddressData>;
  defaultValues?: Partial<AddressData>;
  isEditMode: boolean;
}

export default function AddressForm({
  onSubmit,
  defaultValues = {},
  isEditMode,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AddressData>({
    defaultValues: {
      ...defaultValues,
      is_default: defaultValues.is_default || false,
    },
  });
  const {
    deliveryMemo,
    handleSelectChanges,
    internalOnSubmit,
    selfDeliveryOption,
    setDeliveryMemo,
  } = useAddressForm(onSubmit, defaultValues, setValue);
  const { setStep } = storeModalShowstep();

  return (
    <form className="space-y-3" onSubmit={handleSubmit(internalOnSubmit)}>
      <Input
        label="받는 분 *"
        placeholder="받는 분의 성함을 입력하세요"
        variant="underlined"
        {...register("receiver_name", { required: "받는 분을 입력해주세요." })}
        isInvalid={!!errors.receiver_name}
        errorMessage={errors.receiver_name?.message}
      />
      <Input
        label="전화번호 *"
        type="number"
        placeholder="받는 분의 전화번호를 입력하세요"
        variant="underlined"
        {...register("receiver_phone", {
          required: "전화번호를 입력해주세요.",
        })}
        isInvalid={!!errors.receiver_phone}
        errorMessage={errors.receiver_phone?.message}
      />
      <div className="flex items-end gap-3">
        <Input
          label="기본주소 *"
          placeholder="우측 '주소 선택' 버튼을 클릭하세요"
          variant="underlined"
          readOnly
          {...register("main_address", {
            required: "기본 주소를 입력해주세요.",
          })}
          isInvalid={!!errors.main_address}
          errorMessage={errors.main_address?.message}
        />
        <Button size="sm" variant="flat" onClick={() => setStep(3)}>
          주소 선택
        </Button>
      </div>
      <Input
        label="우편번호 *"
        variant="underlined"
        readOnly
        {...register("zip_code", { required: "우편번호를 입력해주세요." })}
        isInvalid={!!errors.zip_code}
        errorMessage={errors.zip_code?.message}
      />
      <Input
        label="상세주소"
        placeholder="상세 주소를 입력하세요"
        variant="underlined"
        {...register("detail_address")}
      />
      <Controller
        name="shipping_memo"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            items={DELIVERY_OPTIONS}
            label="배송 요청사항"
            placeholder="선택해주세요"
            variant="underlined"
            size="sm"
            selectedKeys={field.value ? [field.value] : []}
            onChange={(e) => handleSelectChanges(e.target.value)}
          >
            {(option) => (
              <SelectItem key={option.name} value={option.name}>
                {option.name}
              </SelectItem>
            )}
          </Select>
        )}
      />
      {selfDeliveryOption && (
        <Textarea
          placeholder="배송 요청사항을 입력해주세요"
          value={deliveryMemo}
          onChange={(e) => setDeliveryMemo(e.target.value)}
        />
      )}
      <div className="flex justify-end">
        <Controller
          name="is_default"
          control={control}
          render={({ field }) => (
            <Checkbox
              size="sm"
              isSelected={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            >
              기본 배송지로 설정하기
            </Checkbox>
          )}
        />
      </div>
      <Button type="submit" color="primary" className="w-full">
        {isEditMode ? "주소 수정" : "주소 추가"}
      </Button>
    </form>
  );
}
