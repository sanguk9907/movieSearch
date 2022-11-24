import { instance } from ".";
import { Login } from "../pages";

const getMovieApi = async () => {
  return await instance.get(`/main/movie`).then(({ data }) => {
    return data;
  });
};

// 영화 id로 영화 상세정보 불러오기
const detailData = async (movieID) => {
  return await instance
    .get(`/movie/detail`, {
      params: {
        movieID: movieID,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

const getSlide = async (itemList) => {
  return await instance
    .get(`/main/slide`, {
      params: {
        itemList: itemList,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

const liked = async (clickedLike, movieId) => {
  return await instance
    .put("/like", {
      data: {
        clickedLike: clickedLike,
        movieID: movieId,
      },
    })
    .then(({ data }) => {
      alert(data.message);
    });
};
const userDelete = async (userCheckInfo) => {
  return await instance
    .delete("/delete", {
      data: userCheckInfo,
    })
    .then(({ data }) => {
      return data;
    });
};

export { detailData, getMovieApi, getSlide, liked, userDelete };
