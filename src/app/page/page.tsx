import Script from "next/script";
import type { AppProps } from "next/app";

export default function Page({Component, pageProps}: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script 
        src="https://pay.nicepay.co.kr/v1/js/"
        onLoad={() => console.log('script loaded')}
      />
    </>
  );
}