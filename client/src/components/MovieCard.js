import React, { useRef, useState } from "react";
// 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

SwiperCore.use([Navigation, Pagination]);

function MovieCard({ movie }) {
  return (
    <div className="movie-wrap">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={5}
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {movie &&
          movie.map((item, index) => {
            return (
              <SwiperSlide>
                <div key={`movie-${index}`} className="movie-card">
                  <div
                    className="img-box"
                    style={{
                      backgroundImage: `url("https://image.tmdb.org/t/p/w500/${item.poster_path}")`,
                    }}
                  >
                    {/* <img
                      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      alt={item.title}
                    /> */}
                  </div>
                  <p className="title">{item.title}</p>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default MovieCard;
