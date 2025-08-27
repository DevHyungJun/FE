import Swal from "sweetalert2";
import { OrderResponseData, ProductList, SelectedAddress } from "../types";
import { useEffect, useState } from "react";
import useDetail from "@/hooks/useDetail";
import useSingleOrderGet from "@/hooks/useSingleOrderGet";
import { storeOrderData } from "@/store";

const useOrder = (id: string, selectedAddress: SelectedAddress) => {
  const [productList, setProductList] = useState<ProductList[]>([]);
  const { setOrderData, clearOrderData } = storeOrderData();
  const { data: orderData, isLoading } = useSingleOrderGet(id);
  const { data: firstProductData } = useDetail(
    orderData?.data?.product_list[0].articleId,
    !!orderData?.data?.product_list[0].articleId
  );
  const firstProductName = firstProductData?.data?.product?.product_name;

  const resultPrice = productList.reduce(
    (total, product) => total + product.price,
    0
  );

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
    orderData,
    isLoading,
    setProductList,
    resultPrice,
    handleClickPay,
  };
};

export default useOrder;
