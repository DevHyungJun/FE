'use client';

import { Button, Select, SelectItem, Textarea, Image, Input, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoClose, IoArrowBack } from "react-icons/io5";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useForm } from "react-hook-form";
import useNewAddress from "@/hooks/useNewAddress";
import useSearchAddress from "@/hooks/useSearchAddress";
import Swal from "sweetalert2";

interface ModalProps {
  modalShowStep: number;
  setModalShowStep: React.Dispatch<React.SetStateAction<number>>;
  addressData: any;
  setAddressData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Order() {
  const [selfDeliveryOption, setSelfDeliveryOption] = useState(false);
  const [modalShowStep, setModalShowStep] = useState(0);
  const [addressData, setAddressData] = useState({
    receiver_name: null,
    receiver_phone: null,
    main_address: null,
    detail_address: null,
    zip_code: null,
    is_default: false,
    shipping_memo: null
  });

  useEffect(() => {
    if (modalShowStep === 0) {
      setAddressData({
        receiver_name: null,
        receiver_phone: null,
        main_address: null,
        detail_address: null,
        zip_code: null,
        is_default: false,
        shipping_memo: null
      })
    };
  }, [modalShowStep]);

  const selectDeliveryOption = [
    { id: 1, name: '문 앞에 놔주세요' },
    { id: 2, name: '경비실에 맡겨주세요' },
    { id: 3, name: '택배함에 넣어주세요' },
    { id: 4, name: '배송 전에 연락 주세요' },
    { id: 5, name: '직접입력' }
  ];

  const handleSelfWrite = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '5') {
      setSelfDeliveryOption(true);
      return;
    }
    setSelfDeliveryOption(false);
  };

  return (
    <div className="flex flex-col gap-5 max-w-[1400px] mx-auto p-1">
      <h1 className="text-2xl font-semibold m-1">주문서</h1>
      {modalShowStep === 1 && <Modal modalShowStep={modalShowStep} setModalShowStep={setModalShowStep} addressData={addressData} setAddressData={setAddressData} />}
      {modalShowStep === 2 && <PostNewAddress modalShowStep={modalShowStep} setModalShowStep={setModalShowStep} addressData={addressData} setAddressData={setAddressData} />}
      {modalShowStep === 3 && <DaumPost modalShowStep={modalShowStep} setModalShowStep={setModalShowStep} addressData={addressData} setAddressData={setAddressData} />}
      <div className="border-b p-3 rounded-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 mb-5">
            <p className="text-lg font-semibold">홍길동</p>
            <p className="text-xs bg-gray-100 text-gray-600 rounded-sm p-0.5">기본 배송지</p>
          </div>
          <Button size="sm" onClick={() => setModalShowStep(1)}>배송지 변경</Button>
        </div>

        <div className="space-y-2 text-sm">
          <p>대구 동구 동북로 306-13 (정덕금탑빌라) 301호</p>
          <p>010-1234-5678</p>
          <Select
            items={selectDeliveryOption}
            label="배송 요청사항"
            placeholder="선택해주세요"
            size="sm"
            onChange={handleSelfWrite}
          >
            {selectDeliveryOption.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id}
              >
                {option.name}
              </SelectItem>
            ))}
          </Select>
          {selfDeliveryOption && <Textarea placeholder="배송 요청사항을 입력해주세요" />}
        </div>
      </div>

      <div className="border-b p-3 rounded-sm">
        <h2 className="text-lg font-semibold mb-5">주문 상품 1개</h2>
        <p className="text-sm mb-1">10월 10일 발송 예정</p>
        <div className="flex gap-3">
          <Image width={100}
            alt="product image"
            src="https://rich-shop-bucket.s3.ap-northeast-2.amazonaws.com/images/1727726688491_3816006_17079078956050_big.webp"
            className="rounded-md object-contain bg-gray-100"
          />
          <div className="space-y-2 text-sm">
            <p>2C TRUCKER BALL CAP - CHARCOAL</p>
            <p className="text-gray-500">M / 1개</p>
            <p className="font-semibold">34,710원</p>
          </div>
        </div>
      </div>

      <div className="border-b p-3 rounded-sm space-y-2">
        <h2 className="text-lg font-semibold mb-5">결제 금액</h2>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">상품 금액</p>
          <p>34,710원</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">배송비</p>
          <p>3,000원</p>
        </div>
        <div className="flex justify-between font-semibold">
          <h3>총 결제 금액</h3>
          <p>37,710원</p>
        </div>
      </div>

      <Button color="primary">37,710원 결제하기</Button>
    </div>
  )
};

const Modal: React.FC<ModalProps> = ({ modalShowStep, setModalShowStep, addressData, setAddressData }) => {
  const { data, isLoading } = useSearchAddress();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed p-1 inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setModalShowStep(0)} />
      <div className="relative overflow-y-auto w-[800px] min-h-[443px] max-h-[600px] p-3 bg-white z-10 rounded-lg">
        <div className="flex justify-between items-start">
          <h1 className="text-lg font-semibold mb-5">배송지 정보</h1>
          <button onClick={() => setModalShowStep(0)}>
            <IoClose className="text-2xl" />
          </button>
        </div>
        <Button
          variant="bordered"
          className="w-full"
          size="sm"
          onClick={() => setModalShowStep(2)}
        >
          배송지 추가하기
        </Button>
        {data?.data.map((address: any) => (
          <div className="mt-3">
            <div className="border-b-2 pb-2">
              <div className="flex items-center gap-3">
                <p className="text-lg font-semibold">{address?.receiver_name}</p>
                {address?.is_default && (
                  <p className="text-xs bg-gray-100 text-gray-600 rounded-sm p-0.5">기본 배송지</p>
                )}
              </div>
              <div className="my-2 space-y-1 text-sm">
                <p>{`${address?.main_address} ${address?.detail_address}`}</p>
                <p>우편번호 {address?.zip_code}</p>
                <p>{address?.receiver_phone}</p>
              </div>
              <div className="space-x-0.5">
                <button className="border px-2 py-0.5 rounded-md text-sm">수정</button>
                <button className="border px-2 py-0.5 rounded-md text-sm">선택</button>
                <button className="border px-2 py-0.5 rounded-md text-sm">삭제</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PostNewAddress = ({ modalShowStep, setModalShowStep, addressData, setAddressData }: ModalProps) => {
  const [defaultAddress, setDefaultAddress] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate: newAddress } = useNewAddress();

  let showMainAddress = addressData.main_address ? `${addressData.main_address} ${addressData.detail_address} ${addressData.zip_code}` : '';

  const onSubmit = (data: any) => {
    const newAddressData = {
      ...data,
      is_default: defaultAddress,
      main_address: addressData.main_address,
      detail_address: addressData.detail_address,
    };
    newAddress(newAddressData, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: '주소가 성공적으로 추가되었습니다.',
          showConfirmButton: false,
          timer: 1500
        });
        setModalShowStep(1);
      }
    });
  };

  return (
    <div className="fixed p-1 inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setModalShowStep(0)} />
      <div className="relative overflow-y-auto w-[800px] min-h-[443px] max-h-[600px] p-3 bg-white z-10 rounded-lg">
        <div className='flex flex-col justify-between'>
          <div className="flex justify-between items-start">
            <h1 className="text-lg font-semibold mb-5">신규 주소 추가</h1>
            <div className="flex items-center gap-2 text-2xl">
              <button onClick={() => setModalShowStep((prev) => prev - 1)}>
                <IoArrowBack />
              </button>
              <button onClick={() => setModalShowStep(0)}>
                <IoClose />
              </button>
            </div>
          </div>
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="받는 분"
              placeholder="받는 분의 성함을 입력하세요"
              variant="underlined"
              {...register('receiver_name')}
            />
            <Input
              label="전화번호"
              type="number"
              placeholder="받는 분의 전화번호를 입력하세요"
              variant="underlined"
              {...register('receiver_phone')}
            />
            <div className="flex items-end gap-3">
              <Input label="기본주소" placeholder="받는 곳의 기본 주소를 우측 주소 선택을 하여 입력하세요" variant="underlined" readOnly value={showMainAddress} />
              <Button size="sm" onClick={() => setModalShowStep(3)}>주소 선택</Button>
            </div>
            {addressData.zip_code && (
              <Input label="우편번호"
                variant="underlined"
                readOnly
                value={addressData.zip_code}
                {...register('zip_code')}
              />
            )}
            <Input label="상세주소" placeholder="받는 곳의 상세 주소를 입력하세요" variant="underlined" />
            <div className="flex justify-end">
              <Checkbox
                size="sm"
                isSelected={defaultAddress}
                onClick={() => setDefaultAddress(!defaultAddress)}
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

const DaumPost = ({ modalShowStep, setModalShowStep, addressData, setAddressData }: ModalProps) => {
  const handleCompleted = (data: any) => {
    setAddressData({
      ...addressData,
      main_address: data.sido,
      detail_address: `${data.sigungu} ${data.bname}`,
      zip_code: data.zonecode
    });
    setModalShowStep(2);
  };

  return (
    <div className="fixed p-1 inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setModalShowStep(0)} />
      <div className="relative overflow-y-auto w-[800px] min-h-[443px] max-h-[600px] p-3 bg-white z-10 rounded-lg">
        <div className="flex justify-end items-center gap-2 mb-5">
          <button>
            <IoArrowBack className="text-2xl" onClick={() => setModalShowStep(2)} />
          </button>
          <button>
            <IoClose className="text-2xl" onClick={() => setModalShowStep((prev) => prev - 1)} />
          </button>
        </div>
        <DaumPostcodeEmbed onComplete={handleCompleted} style={{ height: '443px' }} />
      </div>
    </div>
  )
};