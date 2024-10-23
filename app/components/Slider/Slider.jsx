"useClient";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import s from "./Slider.module.scss";

const Slider = ({ products }) => {
  const [windowSize, setWindowSize] = useState();

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  const widthViewPort = () => {
    if ((windowSize > 768) & (windowSize < 1200)) {
      return 4;
    } else if (windowSize > 1200) {
      return 5;
    } else {
      return 3;
    }
  };

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={widthViewPort()}
      // centeredSlides={true}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <Link
            className={s.link}
            href={`/${product.genderCategory}/${product.category}/${product.id}`}
          >
            <Image
              className={s.image}
              src={product.image[0].url}
              alt="product"
              width="0"
              height="0"
              sizes="100vw"
              priority={true}
            />
            <div className={s.info}>
              <h2 className={s.name}>
                {product.name.length > 15
                  ? product.name.split(" ").slice(0, 2).join(" ")
                  : product.name}
              </h2>
              <p>{product.price} грн.</p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
