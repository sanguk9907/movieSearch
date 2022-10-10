import React from "react";
// 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
// 스와이퍼
import { instance } from "../apis";
import MovieDetail from "./MovieDetail"; //영화 상세정보 모달
import { detailData } from "../helper/fetchData";

SwiperCore.use([Navigation, Pagination]);

function MovieCard({ movie }) {
  // 영화 상세정보를 담는 스테이트
  const [movieDetail, setMovieDetail] = React.useState();

  return (
    <div className="movie-wrap">
      {/* 스와이퍼 슬라이드 */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={5}
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
      >
        {movie &&
          movie.map((item, index) => {
            return (
              <SwiperSlide key={`movie-${index}`}>
                <div className="movie-card">
                  <div
                    className="img-box"
                    onClick={() => {
                      detailData(item.id, setMovieDetail);
                    }}
                    style={{
                      backgroundImage: `url("https://image.tmdb.org/t/p/w500/${item.poster_path}")`,
                    }}
                  ></div>
                  <p className="title">{item.title}</p>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {movieDetail && (
        <MovieDetail
          movieDetail={movieDetail}
          setMovieDetail={setMovieDetail}
        />
      )}
    </div>
  );
}

export default MovieCard;
