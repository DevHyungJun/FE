"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Modal from "../../components/address/Modal";
import PostNewAddress from "../../components/address/PostNewAddress";
import DaumPost from "../../components/address/DaumPost";
import { storeModalShowstep } from "@/store";
import { storeAddressData } from "@/store";
import EditAddress from "../../components/address/EditAddress";
import { useQueryClient } from "@tanstack/react-query";
import formatPhoneNumber from "@/util/formatPhoneNumber";
import formatPrice from "@/util/formatPrice";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Swal from "sweetalert2";
import useSingleOrderGet from "@/hooks/useSingleOrderGet";
import OrderDetail from "@/app/components/OrderDetail";
import useDetail from "@/hooks/useDetail";

interface SelectedAddress {
  receiver_name: string;
  receiver_phone: string;
  main_address: string;
  detail_address: string;
  zip_code: string;
  is_default: boolean;
  shipping_memo: string;
  delivery_option: string;
  self_delivery_memo: string;
  _id: string;
}

interface OrderResponseData {
  product: string;
  quantity: number;
  articleId: string;
  _id: string;
}

interface ProductList {
  product: string;
  price: number;
}

export default function Order({ params }: { params: { id: string } }) {
  const { id } = params;
  const queryClient = useQueryClient();
  const { step, setStep } = storeModalShowstep();
  const { resetAddressData } = storeAddressData();
  const [editId, setEditId] = useState("");
  const initialAddress = {} as SelectedAddress;
  const [selectedAddress, setSelectedAddress] = useState(initialAddress);
  const data = queryClient.getQueryData(["searchAddress"]);
  const [productList, setProductList] = useState<ProductList[]>([]);
  const { data: orderData, isLoading } = useSingleOrderGet(id);
  const DELIVERY_PRICE = 3000;
  const { data: firstProductData } = useDetail(
    orderData?.data?.product_list[0].articleId,
    !!orderData?.data?.product_list[0].articleId
  );
  const firstProductName = firstProductData?.data?.product?.product_name;

  // 어떻게 결제 이력 API를 NICEPAY 결제가 완료된 시점에 호출하지?

  const resultPrice = () => {
    if (productList.length === 0) {
      return 0;
    }
    return productList.reduce((total, product) => total + product.price, 0);
  };

  useEffect(() => {
    // 모달 켜졌을 때 배경 스크롤 막기
    if (step > 0) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.touchAction = "auto";
      document.body.style.overflow = "auto";
    }
  }, [step]);

  useEffect(() => {
    if (!data) return;
    const foundAddress = (data as { data: SelectedAddress[] })?.data?.find(
      (address: SelectedAddress) => address._id === selectedAddress?._id
    );
    if (foundAddress) {
      setSelectedAddress(foundAddress);
    } else {
      setSelectedAddress(initialAddress);
    }
  }, [data]);

  useEffect(() => {
    if (step < 2) {
      resetAddressData();
    }
  }, [step]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pay.nicepay.co.kr/v1/js/";
    script.onload = () => {
      console.log("Script loaded, window.AUTHNICE:", (window as any).AUTHNICE);
    };
    script.onerror = () => {
      console.error("Failed to load the script");
    };
    document.body.appendChild(script);
  }, []);

  const randomOrderId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const goodsName = () => {
    if (orderData?.data?.product_list.length > 1) {
      return `${firstProductName} 외 ${
        orderData?.data?.product_list.length - 1
      }개`;
    } else {
      return firstProductName;
    }
  };

  const handlePay = () => {
    const { AUTHNICE } = window as any;

    AUTHNICE?.requestPay({
      clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID,
      method: "card",
      orderId: `order-${randomOrderId()}`,
      amount: resultPrice() + DELIVERY_PRICE,
      goodsName: goodsName(),
      returnUrl: "http://localhost:5000/order-success",
      fnError: function (result: any) {
        alert("개발자확인용 : " + result.errorMsg + "");
      },
    });
  };

  const handleClickPay = () => {
    if (!selectedAddress?._id) {
      Swal.fire({
        icon: "error",
        title: "배송지 선택",
        text: "배송지를 선택해주세요",
      });
      return;
    }
    handlePay();
  };

  return (
    <div className="flex flex-col gap-5 max-w-[1400px] mx-auto p-1">
      <h1 className="text-2xl font-semibold m-1">주문서</h1>
      <h2 className="text-lg font-semibold">
        주문 상품 {orderData?.data?.product_list.length}개
      </h2>
      {step === 1 && (
        <Modal setSelectedAddress={setSelectedAddress} setEditId={setEditId} />
      )}
      {step === 2 && <PostNewAddress />}
      {step === 3 && <DaumPost />}
      {step === 4 && <EditAddress editId={editId} />}
      {selectedAddress?.receiver_name ? (
        <div className="border-y p-3 rounded-sm">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 mb-5">
              <p className="text-lg font-semibold">
                {selectedAddress?.receiver_name}
              </p>
              {selectedAddress.is_default && (
                <p className="text-xs bg-gray-100 text-gray-600 rounded-sm p-0.5">
                  기본 배송지
                </p>
              )}
            </div>
            <Button size="sm" variant="flat" onClick={() => setStep(1)}>
              배송지 변경
            </Button>
          </div>

          <div className="space-y-1 text-sm text-gray-800 font-medium">
            <p>
              {selectedAddress?.main_address} {selectedAddress?.detail_address}
            </p>
            <p>{formatPhoneNumber(selectedAddress?.receiver_phone)}</p>
            <p>{selectedAddress?.shipping_memo}</p>
          </div>
        </div>
      ) : (
        <div className="border-b p-3 rounded-sm">
          <div className="flex justify-between items-center mb-5">
            <p>배송지가 선택되지 않았습니다. 배송지를 선택해주세요</p>
            <Button size="sm" variant="flat" onClick={() => setStep(1)}>
              배송지 선택
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {orderData?.data?.product_list?.map((product: OrderResponseData) => (
            <OrderDetail
              key={product?.articleId}
              articleId={product?.articleId}
              quantity={product?.quantity}
              setProductList={setProductList}
            />
          ))}
        </>
      )}
      <div className="p-3 rounded-sm space-y-2">
        <h2 className="text-lg font-semibold mb-5">결제 금액</h2>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">상품 금액</p>
          <p>{formatPrice(resultPrice())}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">배송비</p>
          <p>{formatPrice(DELIVERY_PRICE)}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <h3>총 결제 금액</h3>
          <p>{formatPrice(resultPrice() + DELIVERY_PRICE)}</p>
        </div>
      </div>
      <Button color="primary" className="w-full mt-1" onClick={handleClickPay}>
        {formatPrice(resultPrice() + DELIVERY_PRICE)}
        <p>결제하기</p>
      </Button>
    </div>
  );
}
