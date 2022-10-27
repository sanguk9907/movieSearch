import React from "react";
import { detailData, movieProvider } from "../helper/fetchData";

function SlideText({ movieId, index, setShowDetail, setProviderData }) {
  const [movieDetail, setMovieDetail] = React.useState({});

  const { movieTitle, tagLine, overView, genres, average } = movieDetail;

  React.useEffect(() => {
    detailData(movieId, setMovieDetail);
  }, []);

  return (
    movieDetail && (
      <div className={`slide-text-warp text-${index}`}>
        <div className={`text-box text-${index}`}>
          <div className="title">
            <h3>{movieTitle}</h3>
            {tagLine && <p className="tagline">{tagLine}</p>}
          </div>
          <div className="overview">
            <span>줄거리</span>
            <p>{overView}...</p>
          </div>
          <div className="genres">
            <span>장르</span>
            <p>
              {genres &&
                genres.map((item) => {
                  return ` ${item.name} `;
                })}
            </p>
          </div>

          <p className="vote_average">
            평점 : &nbsp;
            {average && average}
          </p>

          <span
            className="more"
            onClick={() => {
              setShowDetail(movieDetail);
              movieProvider(movieDetail.movieId, setProviderData);
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
