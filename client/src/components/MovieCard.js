import React from "react";
// 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
// 스와이퍼
import MovieDetail from "./MovieDetail"; //영화 상세정보 모달
import { detailData, movieProvider } from "../apis/fetchData";
import { StoreContext } from "../App";

SwiperCore.use([Navigation, Pagination]);

function MovieCard({ movie }) {
  // 영화 상세정보를 담는 스테이트
  const { setMovieDetail, setProviderData } = React.useContext(StoreContext);
  // const [movieDetail, setMovieDetail] = React.useState();
  // const [providerData, setProviderData] = React.useState();

  function 바디클릭(event) {
    const target = event.target;
    const detail_card = target.closestByClass("detail-card");

    if (!detail_card) {
      setMovieDetail(null);
    }
  }

  React.useEffect(() => {
    window.addEventListener("click", 바디클릭);

    return () => {
      window.removeEventListener("click", 바디클릭);
    };
  }, []);

  return (
    <div className="movie-wrap">
      {/* 스와이퍼 슬라이드 */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          420: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1200: { slidesPerView: 5 },
        }}
        pagination={{
          type: "progressbar",
        }}
      >
        {movie &&
          movie.map((item, index) => {
            return (
              <SwiperSlide key={`movie-${index}`}>
                <div className="movie-card">
                  <div
                    className="img-box"
                    onClick={() => {
                      detailData(item.movieID, setMovieDetail);
                      movieProvider(item.movieID, setProviderData);
                    }}
                    style={{
                      backgroundImage: `url("https://image.tmdb.org/t/p/w500/${item.posterImage}")`,
                    }}
                  ></div>
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
