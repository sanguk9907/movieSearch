import { instance, requests } from "./index";

const movieData = (setState) => {
  instance.get(requests.Popular).then((response) => {
    const data = response.data.results;
    setState(data);
  });
};

//   위에서 받은 정보로 상세정보 받아오기
const detailData = (state, setState, array) => {
  state.forEach((item) => {
    instance
      .get(`/movie/${item.id}`, {
        params: {
          append_to_respons: "videos",
          language: "ko",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(response);
        array.push(data);
        setState(array);
      });
  });
};

export { movieData, detailData };
