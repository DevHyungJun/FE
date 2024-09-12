import Image from "next/image";

export default function MostPopular() {
  const mostPopularProducts = [
    {
      src: '/mostPopular_img1.webp',
      alt: 'image1',
      brand: 'Nike',
      Ename: 'Nike x Peaceminusone Air Force 1 Low Para-Noise 3.0 Black and Multicolor',
      Kname: '나이키 x 피스마이너스원 에어포스 1 로우 파라노이즈 3.0 블랙 앤 멀티컬러',
      price: 303000,
    },
    {
      src: '/mostPopular_img2.webp',
      alt: 'image2',
      brand: 'Adidas',
      Ename: 'Adidas Waffle Beckenbauer Track Top Wonder White - KR Sizing',
      Kname: '아디다스 와플 베큰바워 트랙 탑 원더 화이트 - KR 사이즈',
      price: 130000,
    },
    {
      src: '/mostPopular_img3.webp',
      alt: 'image3',
      brand: 'Nike',
      Ename: "Nike Air Force 1 '07 WB Flax'",
      Kname: "나이키 에어포스 1 '07 WB 플랙스'",
      price: 150000,
    },
    {
      src: '/mostPopular_img4.webp',
      alt: 'image4',
      brand: 'Apple',
      Ename: 'Apple AirPods Max Silver (Korean Ver.)',
      Kname: '애플 에어팟 맥스 실버 (국내 정식 발매 제품)',
      price: 600000,
    },
    {
      src: '/mostPopular_img5.webp',
      alt: 'image5',
      brand: 'Asics',
      Ename: 'Asics Gel-Kayano 14 Cream Black',
      Kname: '아식스 젤 카야노 14 크림 블랙',
      price: 206000,
    },
  ];

  return (
    <div className="flex flex-col gap-3 max-w-[50vw] mx-auto mt-10">
      <div className="flex flex-col pl-1">
        <h2 className="font-semibold">Most Popular</h2>
        <p className="text-sm text-gray-500">인기 상품</p>
      </div>
      <div className="flex justify-center">
        {mostPopularProducts.map(product => (
          <div key={product.price}
            className="flex flex-col justify-between gap-1 w-[300px] h-[350px] text-sm text-gray-800 p-1 cursor-pointer">
            <Image src={product.src} alt={product.alt} width={300} height={300}
              className="bg-gray-100 rounded-md" />
            <div className="flex flex-col gap-1 p-1">
              <p className="font-semibold">{product.brand}</p>
              <p className="text-xs">{product.Ename}</p>
            </div>
            <div className="p-1">
              <p className="font-semibold">{product.price}원</p>
              <p className="text-[11px] text-gray-400">즉시 구매가</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-5">
        <button className="border px-8 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-100">
          더보기
        </button>
      </div>
    </div>
  );
}