import React from "react";
import { Icon } from "semantic-ui-react";
import { detailData } from "../helper/fetchData";

function MovieDetail({ movieDetail, setMovieDetail }) {
  const posterUrl = `https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`; //포스터 이미지
  const movieTitle = movieDetail.title; // 영화 제목
  const tagLine = movieDetail.tagline; // 영화 테그
  const genres = movieDetail.genres; //장르
  const overView = movieDetail.overview; // 줄거리
  const cast = movieDetail.credits.cast; //출연진
  const similar = movieDetail.similar.results; //비슷한 영화

  // 비디오 출력
  const iframe = () => {
    if (movieDetail.videos.results.length === 0) {
      return <div>제공된 비디오가 없습니다</div>;
    } else {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${movieDetail.videos.results[0].key}`}
          frameBorder="0"
        ></iframe>
      );
    }
  };

  return (
    <div
      className="detail-wrap"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}")`,
      }}
    >
      {/*바깥부분 누르면 나가지기*/}
      <div
        className="overlay"
        onClick={() => {
          setMovieDetail(null);
        }}
      ></div>

      <div className="detail-card">
        {/*닫기버튼*/}
        <Icon
          name="close"
          onClick={() => {
            setMovieDetail(null);
          }}
        />

        {/*포스터이미지*/}
        <div className="img-box">
          <img src={posterUrl} alt={movieTitle}></img>
          <div className="title">
            <h3>{movieTitle}</h3>
            <p className="tag">{tagLine}</p>
          </div>
        </div>

        <div className="movie-info">
          <p className="genres">
            장르 :
            {genres.map((item, index) => {
              item.name = ` ${item.name} `;
              return <b key={`genres-${index}`}>{item.name}</b>;
            })}
          </p>

          <p className="overview">
            줄거리
            <br />
            <b>{overView}</b>
          </p>

          <div className="cast">
            출연진
            <br />
            {cast.map((item, index) => {
              item.name = ` ${item.name}, `;
              return <b key={`cast-${index}`}>{item.name}</b>;
            })}
          </div>

          <div className="videos">{iframe()}</div>

          <div className="similar">
            <b>비슷한 영화</b>
            <div>
              {similar.map((item, index) => {
                return (
                  <div
                    key={`similar-${index}`}
                    onClick={() => {
                      detailData(item.id, setMovieDetail);
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                    ></img>
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
