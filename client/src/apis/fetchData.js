import { instance } from ".";

const getMovieApi = async () => {
  return await instance.get(`/main/movie`).then((response) => {
    console.log(response);

    return response.data;
  });
};

// 영화 id로 영화 상세정보 불러오기
const detailData = async (movieId, setMovieDetail) => {
  await instance
    .get(`/Information`, {
      params: {
        movieId: movieId,
        append_to_response: "videos,similar,credits",
        language: "ko",
        region: "ko",
      },
    })
    .then((response) => {
      const detailData = response.data;
      setMovieDetail(detailData);
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
