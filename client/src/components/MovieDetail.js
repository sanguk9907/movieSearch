import React from "react";
import { Icon } from "semantic-ui-react";
import { instance } from "../apis";
import { detailData, movieProvider } from "../helper/fetchData";
import notFoundImg from "../img/not-found.jpg";
import { StoreContext } from "../App";
import axios from "axios";

function MovieDetail({
  movieDetail,
  setMovieDetail,
  provider,
  setProviderData,
}) {
  const [clickedLike, setClickedLike] = React.useState(true);
  const { loginUser, setLoginUser } = React.useContext(StoreContext);
  const posterUrl =
    movieDetail.poster_path === null
      ? notFoundImg
      : `https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`; //포스터 이미지
  const movieTitle = movieDetail.title; // 영화 제목
  const tagLine = movieDetail.tagline; // 영화 테그
  const genres = movieDetail.genres; //장르
  const overView = movieDetail.overview; // 줄거리
  const similar = movieDetail.similar.results; //비슷한 영화
  const average = movieDetail.vote_average.toFixed(1); //평점
  const vote_count = movieDetail.vote_count; //평점 낸 인원
  const movieId = movieDetail.id; //영화 고유 아이디
  const release = movieDetail.release_date; //개봉일자

  const findLike = loginUser.liked.find((item) => {
    return item === movieId;
  });

  const likeInit = () => {
    if (findLike === movieId) {
      setClickedLike(false);
    }
  };
  const likeIconclassName = clickedLike ? "like-icon" : "like-icon active";

  const likeIconName = clickedLike ? "heart outline" : "heart";

  // 비디오 출력
  const iframe = () => {
    if (movieDetail.videos.results.length === 0) {
      return (
        <div
          className="noHaveVideo"
          style={{ backgroundImage: `url(${notFoundImg})` }}
        ></div>
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

  const cerateLike = async () => {
    await axios({
      url: "http://localhost:5000/like",
      method: "post",
      data: {
        clickedLike: clickedLike,
        movieID: movieId,
        userID: loginUser.id,
      },
    })
      .then(({ data }) => {
        const likeID = data[data.length - 1].movieID;

        const cloneLoginUser = { ...loginUser };
        cloneLoginUser.liked.push(likeID);
        setLoginUser(cloneLoginUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    setProviderData(provider);
    likeInit();
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
          <div className="img-box">
            <img className="movie-img" src={posterUrl} alt={movieTitle}></img>
            <Icon
              className={likeIconclassName}
              name={likeIconName}
              onClick={(e) => {
                if (!loginUser.id) {
                  alert("로그인 후 이용해주세요");
                  return;
                }

                if (clickedLike) {
                  cerateLike();
                  setClickedLike(!clickedLike);
                  return;
                }

                console.log(clickedLike);
              }}
            />
          </div>

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

            <p className="release-date">개봉일 : {release}</p>

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

        {/* 비디오 출력 */}
        {iframe()}

        {/* 리뷰 */}
        <div className="review">
          <b>영화 리뷰</b>
          <div className="review-box">
            전체평점:{average}
            <div className="review-content">
              ㅇㅇㅇ<p>아이디(혹은닉네임) : 어쩌고저쩌고 머시깽이한 영화</p>
            </div>
            <div className="review-content">
              ㅇㅇㅇ<p>아이디(혹은닉네임) : 어쩌고저쩌고 머시깽이한 영화</p>
            </div>
            <div className="review-content">
              ㅇㅇㅇ<p>아이디(혹은닉네임) : 어쩌고저쩌고 머시깽이한 영화</p>
            </div>
            <div className="review-content">
              ㅇㅇㅇ<p>아이디(혹은닉네임) : 어쩌고저쩌고 머시깽이한 영화</p>
            </div>
            <div className="review-content">
              ㅇㅇㅇ<p>아이디(혹은닉네임) : 어쩌고저쩌고 머시깽이한 영화</p>
            </div>
          </div>
        </div>

        {/* 비슷한영화 */}
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
                    src={
                      item.poster_path === null
                        ? notFoundImg
                        : `https://image.tmdb.org/t/p/w300/${item.poster_path}`
                    }
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
