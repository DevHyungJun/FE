import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const getCarouselSettings = () => ({
  arrows: true,
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  fade: true,
  prevArrow: <IoIosArrowBack />,
  nextArrow: <IoIosArrowForward />,
});
