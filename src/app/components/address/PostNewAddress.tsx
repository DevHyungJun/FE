'use client';

import { Button, Select, SelectItem, Textarea, Input, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoClose, IoArrowBack } from "react-icons/io5";
import { set, useForm } from "react-hook-form";
import useNewAddress from "@/hooks/useNewAddress";
import Swal from "sweetalert2";
import { storeModalShowstep } from "@/store";
import { storeAddressData } from "@/store";

const PostNewAddress = () => {
  const [selfDeliveryOption, setSelfDeliveryOption] = useState(false);
  const [deliveryMemo, setDeliveryMemo] = useState('');

  const { setStep, decrementStep } = storeModalShowstep();
  const { addressData, setAddressData } = storeAddressData();

  const { register, handleSubmit } = useForm({
    defaultValues: addressData
  });

  useEffect(()=> {
    setDeliveryMemo(addressData.shipping_memo || '');
  }, [addressData]);

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressData({ [e.target.name]: e.target.value });
  };

  const { mutate: newAddress } = useNewAddress();

  let showMainAddress = addressData.main_address ? `${addressData.main_address} ${addressData.detail_address} ${addressData.zip_code}` : '';

  const selectDeliveryOption = [
    { id: 1, name: '문 앞에 놔주세요' },
    { id: 2, name: '경비실에 맡겨주세요' },
    { id: 3, name: '택배함에 넣어주세요' },
    { id: 4, name: '배송 전에 연락 주세요' },
    { id: 5, name: '직접입력' }
  ];

  const handleSelectChanges = (value: string) => {
    const selectedOption = selectDeliveryOption.find((option) => option.id.toString() === value);
    if(selectedOption?.name === '직접입력') {
      setDeliveryMemo('');
      setAddressData({ shipping_memo: '' });
      setSelfDeliveryOption(true);
    } else {
      setSelfDeliveryOption(false);
      setDeliveryMemo(selectedOption?.name || '');
      setAddressData({ shipping_memo: selectedOption?.name || '' });
    }
  }

  const handleCheckboxChanges = () => {
    const updatedDefault = !addressData.is_default;
    setAddressData({ is_default: updatedDefault });
  };

  const onSubmit = (data: any) => {
    const newAddressData = {
      ...data,
      is_default: addressData.is_default,
      main_address: addressData.main_address,
      detail_address: addressData.detail_address,
      zip_code: addressData.zip_code,
      shipping_memo: selfDeliveryOption ? deliveryMemo : addressData.shipping_memo
    };
    newAddress(newAddressData, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: '주소가 성공적으로 추가되었습니다.',
          showConfirmButton: false,
          timer: 1500
        });
        setStep(1);
      }
    });
  };

  return (
    <div className="fixed p-1 inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setStep(0)} />
      <div className="relative overflow-y-auto w-[800px] min-h-[443px] max-h-[600px] p-3 bg-white z-10 rounded-lg">
        <div className='flex flex-col justify-between'>
          <div className="flex justify-between items-start">
            <h1 className="text-lg font-semibold mb-5">신규 주소 추가</h1>
            <div className="flex items-center gap-2 text-2xl">
              <button onClick={decrementStep}>
                <IoArrowBack />
              </button>
              <button onClick={() => setStep(0)}>
                <IoClose />
              </button>
            </div>
          </div>
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="받는 분 *"
              placeholder="받는 분의 성함을 입력하세요"
              variant="underlined"
              defaultValue={addressData.receiver_name}
              {...register('receiver_name')}
              onChange={handleInputChanges}
            />
            <Input
              label="전화번호 *"
              type="number"
              placeholder="받는 분의 전화번호를 입력하세요"
              variant="underlined"
              defaultValue={addressData.receiver_phone}
              {...register('receiver_phone')}
              onChange={handleInputChanges}
            />
            <div className="flex items-end gap-3">
              <Input label="기본주소 *" placeholder="받는 곳의 기본 주소를 우측 주소 선택을 하여 입력하세요" variant="underlined" readOnly value={showMainAddress} />
              <Button size="sm" onClick={() => setStep(3)}>주소 선택</Button>
            </div>
            {addressData.zip_code && (
              <Input label="우편번호 *"
                variant="underlined"
                readOnly
                value={addressData.zip_code}
                {...register('zip_code')}
              />
            )}
            <Input label="상세주소" placeholder="받는 곳의 상세 주소를 입력하세요" variant="underlined" {...register('detail_address')} />
            <Select
              items={selectDeliveryOption}
              label="배송 요청사항"
              placeholder="선택해주세요"
              size="sm"
              onChange={(e) => handleSelectChanges(e.target.value)}
            >
              {selectDeliveryOption.map((option) => (
                <SelectItem
                  key={option.id}
                  value={option.name}
                >
                  {option.name}
                </SelectItem>
              ))}
            </Select>
            {selfDeliveryOption && (
              <Textarea 
                placeholder="배송 요청사항을 입력해주세요" 
                value={deliveryMemo}
                onChange={(e) => setDeliveryMemo(e.target.value)}  
              />)}
            <div className="flex justify-end">
              <Checkbox
                size="sm"
                isSelected={addressData.is_default}
                onChange={handleCheckboxChanges}
              >
                기본 배송지로 설정하기
              </Checkbox>
            </div>
            <Button type="submit" color="primary" className="w-full">주소 추가</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostNewAddress;