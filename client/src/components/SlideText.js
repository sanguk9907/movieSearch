import React from "react";
import { detailData, movieProvider } from "../helper/fetchData";

function SlideText({ movieId, index, setShowDetail, setProviderData }) {
  const [movieDetail, setMovieDetail] = React.useState({});

  React.useEffect(() => {
    detailData(movieId, setMovieDetail);
  }, []);

  return (
    movieDetail && (
      <div className={`slide-text-warp text-${index}`}>
        <div className={`text-box text-${index}`}>
          <div className="title">
            <h3>{movieDetail.title}</h3>
            {movieDetail.tagline && (
              <p className="tagline">{movieDetail.tagline}</p>
            )}
          </div>
          <div className="overview">
            <span>줄거리</span>
            <p>{movieDetail.overview}...</p>
          </div>
          <div className="genres">
            <span>장르</span>
            <p>
              {movieDetail.genres &&
                movieDetail.genres.map((item) => {
                  return ` ${item.name} `;
                })}
            </p>
          </div>

          <p className="vote_average">
            평점 : &nbsp;
            {movieDetail.vote_average && movieDetail.vote_average.toFixed(1)}
          </p>

          <span
            className="more"
            onClick={() => {
              setShowDetail(movieDetail);
              movieProvider(movieDetail.id, setProviderData);
            }}
          >
            자세히 보기
          </span>
        </div>
      </div>
    )
  );
}

export default SlideText;
