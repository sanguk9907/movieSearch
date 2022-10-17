import React from "react";
import { Icon } from "semantic-ui-react";
import { detailData, movieProvider } from "../helper/fetchData";

function MovieDetail({
  movieDetail,
  setMovieDetail,
  provider,
  setProviderData,
}) {
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
      return (
        <div className="noHaveVideo">
          <h3>아직 제공된 영상이 없습니다</h3>
        </div>
      );
    } else {
      return (
        <div className="videos">
          <iframe
            src={`https://www.youtube.com/embed/${movieDetail.videos.results[0].key}`}
            frameBorder="0"
            title={movieDetail.videos.results[0].name}
          ></iframe>
        </div>
      );
    }
  };

  React.useEffect(() => {
    setProviderData(provider);
  }, []);

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
        <div className="movie-info">
          <img className="movie-img" src={posterUrl} alt={movieTitle}></img>
          <div className="movie-text">
            <div className="title">
              <h3>{movieTitle}</h3>
              <p className="tag">{tagLine}</p>
            </div>
            <p className="genres">
              장르 :
              {genres.map((item, index) => {
                item.name = ` ${item.name} `;
                return <b key={`genres-${index}`}>{item.name}</b>;
              })}
            </p>

            <p className="overview">
              <b>줄거리</b>
              <br />
              {overView}
            </p>

            {/* <div className="cast">
              출연진
              <br />
              {cast.map((item, index) => {
                item.name = ` ${item.name}, `;
                return <b key={`cast-${index}`}>{item.name}</b>;
              })}
            </div> */}
            <div className="preovier">
              {!provider ? (
                <p className="none">
                  OTT
                  <br />
                  (넷플릭스, 디즈니plus, 왓챠, 웨이브의 정보만 제공됩니다.)
                </p>
              ) : (
                provider.map((item, index) => {
                  if (
                    item.provider_id !== 356 &&
                    item.provider_id !== 97 &&
                    item.provider_id !== 337 &&
                    item.provider_id !== 8
                  ) {
                    return;
                  }
                  let ottLink = `https://www.${item.provider_name.replaceAll(
                    " ",
                    ""
                  )}.com/`;

                  console.log(ottLink);
                  return (
                    <a
                      className="preovier-box"
                      href={ottLink}
                      alt="item.provider_name"
                      target="blank"
                      key={`OTT-${index}`}
                    >
                      <img
                        className="preovier-img"
                        src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                        alt={item.provider_name}
                      ></img>
                      <p className="preovier-name">{item.provider_name}</p>
                    </a>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {iframe()}
        {/* 비디오 출력 */}

        <div className="similar">
          <b>비슷한 영화</b>
          <div>
            {similar.map((item, index) => {
              return (
                <div
                  className="similar-card"
                  key={`similar-${index}`}
                  onClick={() => {
                    detailData(item.id, setMovieDetail);
                    movieProvider(item.id, setProviderData);
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                    alt="similarMovie"
                  ></img>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
