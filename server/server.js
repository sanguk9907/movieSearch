const express = require("express");
const cors = require("cors");
const app = express();
const client_id = "K8KYMWZW1XBkdm7uUAQ5";
const client_secret = "Obdn8ebVlz";

app.use(cors());

app.get("/search/movie", function (req, res) {
  const searchTitle = req.query.searchTitle;
  const api_url = `https://openapi.naver.com/v1/search/movie?query=${encodeURI(
    searchTitle
  )}`;
  const request = require("request");
  const options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(5000, function () {
  console.log("서버켜짐");
});
