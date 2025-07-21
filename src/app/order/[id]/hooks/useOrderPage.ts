"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { storeAddressData, storeModalShowstep, storeOrderData } from "@/store";
import useSingleOrderGet from "@/hooks/useSingleOrderGet";
import useDetail from "@/hooks/useDetail";

import type { OrderResponseData, ProductList, SelectedAddress } from "../types";

export function useOrderPage(id: string) {
  const queryClient = useQueryClient();
  const { step, setStep } = storeModalShowstep();
  const { resetAddressData } = storeAddressData();
  const [editId, setEditId] = useState("");
  const initialAddress = {} as SelectedAddress;
  const [selectedAddress, setSelectedAddress] = useState(initialAddress);
  const data = queryClient.getQueryData(["searchAddress"]);
  const [productList, setProductList] = useState<ProductList[]>([]);
  const { data: orderData, isLoading } = useSingleOrderGet(id);

  const { data: firstProductData } = useDetail(
    orderData?.data?.product_list[0].articleId,
    !!orderData?.data?.product_list[0].articleId
  );
  const firstProductName = firstProductData?.data?.product?.product_name;
  const { setOrderData, clearOrderData } = storeOrderData();

  const resultPrice = productList.reduce(
    (total, product) => total + product.price,
    0
  );

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
  }, [data, selectedAddress?._id, initialAddress]);

  useEffect(() => {
    if (step < 2) {
      resetAddressData();
    }
  }, [step, resetAddressData]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pay.nicepay.co.kr/v1/js/";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const randomOrderId = () => {
    return `order-${Math.floor(Math.random() * 1000000)}`;
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
    if (!AUTHNICE) {
      Swal.fire({
        icon: "error",
        title: "결제 모듈 로딩 실패",
        text: "결제 모듈을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.",
      });
      return;
    }

    const resultOrderData = orderData?.data?.product_list.map(
      (product: OrderResponseData) => ({
        product: product.product,
        quantity: product.quantity,
      })
    );
    setOrderData(resultOrderData);

    AUTHNICE.requestPay({
      clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID,
      method: "card",
      orderId: randomOrderId(),
      amount: resultPrice + 3000, // DELIVERY_PRICE
      goodsName: goodsName(),
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/order-success`,
      fnError: function (result: { errorMsg: string; resultCode: string }) {
        clearOrderData();
        if (result.resultCode === "P091") {
          Swal.fire({
            icon: "info",
            title: "결제 취소",
            text: "결제가 취소되었습니다.",
          });
          return;
        }
        Swal.fire({
          icon: "error",
          title: "결제 오류",
          text: result.errorMsg,
        });
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

  return {
    step,
    setStep,
    editId,
    setEditId,
    selectedAddress,
    setSelectedAddress,
    orderData,
    isLoading,
    productList,
    setProductList,
    resultPrice,
    handleClickPay,
  };
}
