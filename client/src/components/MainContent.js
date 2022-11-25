import React from "react";
// 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
// 스와이퍼
import { detailData } from "../apis/fetchData";
import { StoreContext } from "../App";
SwiperCore.use([Navigation, Pagination]);

function MainContent({ title, semiTitle, movie }) {
  // 영화 상세정보를 담는 스테이트
  const { setMovieDetail, setLoading } = React.useContext(StoreContext);

  function bodyClick(event) {
    const target = event.target;
    const detail_card = target.closestByClass("detail-card");

    if (!detail_card) {
      setMovieDetail(null);
    }
  }

  React.useEffect(() => {
    window.addEventListener("click", bodyClick);

    return () => {
      window.removeEventListener("click", bodyClick);
    };
  }, []);
  return (
    <>
      <div className="text-box">
        <h3>{title}</h3>
        <p>{semiTitle}</p>
      </div>
      <div className="movieCard-wrap">
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
                        onClick={async () => {
                          const items = await detailData(item.movieID);
                          setMovieDetail(items);
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
      </div>
    </>
  );
}

export default MainContent;
