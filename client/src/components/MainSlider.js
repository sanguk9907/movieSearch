import React from "react";
// 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { detailData, fetchData } from "../helper/fetchData";
import { instance, requests } from "../apis";
import SlideText from "./SlideText";
// 스와이퍼

function MainSlider() {
  const [movie, setMovie] = React.useState([]);
  React.useEffect(() => {
    fetchData(requests.Popular, setMovie);
  }, []);

  console.log(movie);
  return (
    <Swiper
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {movie &&
        movie.map((item, index) => {
          if (index > 4) {
            return;
          }

          return (
            <SwiperSlide key={`slider-${index}`}>
              <div className="slide-card">
                <div
                  className={`slide-img item-${index}`}
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${item.backdrop_path}")`,
                  }}
                ></div>

                <SlideText movieId={item.id} index={index} />
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default MainSlider;
