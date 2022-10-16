import React from "react";
// 스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { fetchData } from "../helper/fetchData";
import { requests } from "../apis";
import SlideText from "./SlideText";
import MovieDetail from "./MovieDetail";
// 스와이퍼

function MainSlider() {
  const [movie, setMovie] = React.useState([]);
  const [showDetail, setShowDetail] = React.useState(false);
  const [providerData, setProviderData] = React.useState();
  React.useEffect(() => {
    fetchData(requests.Popular, setMovie);
  }, []);
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

                  <SlideText
                    movieId={item.id}
                    index={index}
                    setShowDetail={setShowDetail}
                    setProviderData={setProviderData}
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      {showDetail && (
        <MovieDetail
          movieDetail={showDetail}
          setMovieDetail={setShowDetail}
          provider={providerData}
          setProviderData={setProviderData}
        />
      )}
    </>
  );
}

export default MainSlider;
