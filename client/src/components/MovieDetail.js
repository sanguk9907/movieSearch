import React from "react";
import { Icon } from "semantic-ui-react";
import { detailData, movieProvider } from "../helper/fetchData";
import notFoundImg from "../img/not-found.jpg";
import { StoreContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Review from "./Review";
axios.defaults.withCredentials = true;
function MovieDetail({
  movieDetail,
  setMovieDetail,
  provider,
  setProviderData,
}) {
  const [clickedLike, setClickedLike] = React.useState(true);
  const [likeMovie, setLikeMovie] = React.useState();
  const { loginUser } = React.useContext(StoreContext);
  const navigation = useNavigate();

  const backgroundFixed = () => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return;
  };

  const backgroundUnFixed = () => {
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  const {
    movieTitle, // 제목
    tagLine, // 테그
    genres, // 장르
    overView, // 줄거리
    similar, // 비슷한영화
    average, // 평점
    vote_count, // 평점 낸 인원 수
    movieId, // 영화 고유아이디
    release, // 개봉일자
    posterImage, // 포스터이미지
    background, // 배경이미지
    videos, // 영화 관련 유튜브 코드
  } = movieDetail;

  // 포스터 url 없으면 못찾은 이미지 나오게
  const posterUrl =
    posterImage === null
      ? notFoundImg
      : `https://image.tmdb.org/t/p/original/${posterImage}`;

  // 배경 url
  const backgroundImg = `url("https://image.tmdb.org/t/p/original/${background}")`;

  // 하트 아이콘 채우고 비우기용
  const likeIconclassName = clickedLike ? "like-icon" : "like-icon active";
  const likeIconName = clickedLike ? "heart outline" : "heart";

  // 비디오 출력
  const iframe = () => {
    if (videos.results.length === 0) {
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
            src={`https://www.youtube.com/embed/${videos.results[0].key}`}
            frameBorder="0"
            title={videos.results[0].name}
          ></iframe>
        </div>
      );
    }
  };

  // 좋아요 버튼 클릭 함수 (좋아요 한 영화 아이디 DB저장,취소한 아이디 DB삭제)
  const liked = async () => {
    await axios({
      url: "http://localhost:5000/like",
      method: "put",
      data: {
        clickedLike: clickedLike,
        movieID: movieId,
      },
    }).then(({ data }) => {
      console.log(data);
      alert(data.message);
    });
  };
  // 좋아요 상태
  const likeInit = async () => {
    await axios({
      url: "http://localhost:5000/like",
      method: "get",
      params: {
        movieID: movieId,
      },
    }).then(({ data }) => {
      if (data.movieID === movieId) {
        setClickedLike(false);
      } else {
        setClickedLike(true);
      }
    });
  };

  React.useEffect(() => {
    setProviderData(provider);
    likeInit();
    backgroundFixed();
  }, []);

  return (
    <div
      className="detail-wrap"
      style={{
        backgroundImage: backgroundImg,
      }}
    >
      {/*바깥부분 누르면 나가지기*/}
      <div
        className="overlay"
        onClick={() => {
          setMovieDetail(null);
          backgroundUnFixed();
        }}
      ></div>

      <div className="detail-card" id="detail-card">
        {/*닫기버튼*/}
        <Icon
          name="close"
          onClick={() => {
            setMovieDetail(null);
            backgroundUnFixed();
          }}
        />

        <div className="movie-info">
          <div className="img-box">
            <img className="movie-img" src={posterUrl} alt={movieTitle}></img>
            <Icon
              className={likeIconclassName}
              name={likeIconName}
              onClick={(e) => {
                if (!loginUser.id) {
                  alert("로그인 후 이용해주세요");
                  navigation("/login");
                  return;
                }
                liked();
                setClickedLike(!clickedLike);
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

        {/* 비슷한영화 */}
        <div className="similar">
          <b>비슷한 영화</b>
          <div>
            {similar.results.map((item, index) => {
              return (
                <div
                  className="similar-card"
                  key={`similar-${index}`}
                  onClick={() => {
                    detailData(item.id, setMovieDetail);
                    movieProvider(item.id, setProviderData);
                    document.getElementById("detail-card").scroll({
                      top: 0,
                      behavior: "smooth",
                    });
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
        {/* 리뷰 */}
        <Review movieId={movieId} />
      </div>
    </div>
  );
}

export default MovieDetail;
