import React from "react";
import { movieProvider } from "../apis/fetchData";
import { StoreContext } from "../App";

function SlideText({ slideContent, index }) {
  const { movieTitle, tagLine, overView, genres, average } = slideContent;
  const { setMovieDetail, setProviderData } = React.useContext(StoreContext);
  return (
    <div className={`slide-text-warp`}>
      <div className={`text-box`}>
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
            setMovieDetail(slideContent);
            movieProvider(slideContent.movieID, setProviderData);
          }}
        >
          자세히 보기
        </span>
      </div>
    </div>
  );
}

export default SlideText;
