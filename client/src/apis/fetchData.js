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
      // console.log(data);
      return data;
    });
};

const movieProvider = (movieId, setProviderData) => {
  instance
    .get(`/providers`, {
      params: {
        movieId: movieId,
        language: "ko",
        region: "ko",
      },
    })
    .then(({ data }) => {
      const detailData =
        data.results.KR && data.results.KR.flatrate && data.results.KR.flatrate;
      setProviderData(detailData);
    });
};

export { detailData, movieProvider, getMovieApi };
