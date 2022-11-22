import { instance } from ".";

const getMovieApi = async () => {
  return await instance.get(`/main/movie`).then(({ data }) => {
    return data;
  });
};

// 영화 id로 영화 상세정보 불러오기
const detailData = async (itemList) => {
  return await instance
    .get(`/movie/detail`, {
      params: {
        itemList: itemList,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

const movieProvider = (movieId) => {
  instance
    .get(`/providers`, {
      params: {
        movieId: movieId,
      },
    })
    .then(({ data }) => {
      return data;
    });
};
export { detailData, movieProvider, getMovieApi };
