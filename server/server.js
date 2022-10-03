const express = require("express");
const cors = require("cors");
const app = express();
const client_id = "K8KYMWZW1XBkdm7uUAQ5";
const client_secret = "Obdn8ebVlz";

app.use(cors());

app.get("/movie", function (req, res) {
  const key = "3cf148810eae178af2afb1a072cfe76d";
  const baseUrl = "https://api.themoviedb.org/3/";
  const popular = "popular"; //인기있는
  const latest = "latest"; //최신인데 안됨
  const topRated = "top_rated"; //최고의 평가
  const upcoming = "upcoming"; //개봉예정작
  const nowPlaying = "now_playing"; //상영중
  const url = `${baseUrl}movie/${popular}?api_key=${key}&language=ko-KR&region=KR`;

  const request = require("request");
  const options = {
    url: url,
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response).end();
      console.log("error = " + response);
    }
  });
});

app.listen(5000, function () {
  console.log("서버켜짐");
});
