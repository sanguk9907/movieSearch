import React from "react";
import { detailData } from "../helper/fetchData";

function SlideText({ movieId, index }) {
  const [movieDetail, setMovieDetail] = React.useState({});
  React.useEffect(() => {
    detailData(movieId, setMovieDetail);
  }, []);
  console.log(movieDetail);
  //   console.log(movieDetail.title);
  //   console.log(movieDetail.tagline);
  return (
    movieDetail && (
      <div className={`slide-text text-${index}`}>{movieDetail.title}</div>
    )
  );
}

export default SlideText;
