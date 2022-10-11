import React from "react";
import { detailData } from "../helper/fetchData";

function SlideText({ movieId, index, setShowDetail }) {
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
            <span className="tagline">{movieDetail.tagline}</span>
          </div>

          <p className="overview">
            줄거리
            <br />
            <span>{movieDetail.overview}...</span>
          </p>
          <p className="genres">
            장르
            <br />
            <span>
              {movieDetail.genres &&
                movieDetail.genres.map((item) => {
                  return ` ${item.name} `;
                })}
            </span>
          </p>

          <p className="vote_average">
            평점 :{" "}
            {movieDetail.vote_average && movieDetail.vote_average.toFixed(1)}
          </p>

          <div
            className="more"
            onClick={() => {
              setShowDetail(movieDetail);
            }}
          >
            자세히 보기
          </div>
        </div>
      </div>
    )
  );
}

export default SlideText;
