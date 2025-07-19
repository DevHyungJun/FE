import ChatUIButton from "./components/ChatUIButton";
import ImgCarousel from "./components/ImgCarousel";
import MostPopular from "./components/MostPopular";

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <ImgCarousel />
      <div className="flex flex-col pl-1">
        <h2 className="extra-bold mt-5 text-xl">Most Popular</h2>
        <p className="text-gray-500">인기 상품</p>
      </div>
      <MostPopular />
      <ChatUIButton />
    </div>
  );
}
