import React from "react";
// 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { detailData } from "../apis/fetchData";
import SlideText from "./SlideText";
// 스와이퍼

function MainSlider({ movie }) {
  const [slideContent, setSlideContent] = React.useState([]);
  const itemList = [];
  for (let key of movie) {
    if (itemList.length >= 5) {
      break;
    }
    itemList.push(key.movieID);
  }
  React.useEffect(() => {
    (async () => {
      if (movie.length !== 0) {
        const data = await detailData(itemList);
        setSlideContent(data);
      }
    })();
  }, [movie]);

  return (
    <>
      <Swiper
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {slideContent &&
          slideContent.map((item, index) => {
            return (
              <SwiperSlide key={`slider-${index}`}>
                <div className="slide-card">
                  <div
                    className={`slide-img item-${index}`}
                    style={{
                      backgroundImage: `url("https://image.tmdb.org/t/p/original/${item.background}")`,
                    }}
                  ></div>
                  <SlideText slideContent={item} index={index} />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}

export default MainSlider;
