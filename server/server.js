const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const request = require("request");
const app = express();

/**
 *
 *
 * 몽구스 설치, 근데 어떻게 하는지 잘 모르겠음
 *
 *
 */
// 내 db주소
const uri = `mongodb+srv://tkddnr6079:asas4545@user.24uzmhz.mongodb.net/?retryWrites=true&w=majority`;

// db 연결
mongoose.connect(uri);

// 스키마생성
const userSchema = new Schema({
  user_id: {
    required: true,
    unique: true,
    type: String,
  },

  password: {
    required: true,
    type: String,
  },
  versionKey: false,
});

// 모델생성
const usersModel = mongoose.model("user", userSchema);
/**
 *
 *
 *
 *
 *
 */

app.use(cors());
app.use(express.json());

const key = "3cf148810eae178af2afb1a072cfe76d";
app.get("/mainPageData", async function (req, res) {
  const { category } = req.query;
  request(
    {
      uri: `https://api.themoviedb.org/3/${category}?api_key=${key}`,
      method: "get",
      qs: { language: "ko" },
    },
    function (error, response, body) {
      const data = JSON.parse(body);
      res.send(data);
    }
  );
});

app.get("/Information", async function (req, res) {
  const { movieId } = req.query;
  request(
    {
      uri: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`,
      method: "get",
      qs: {
        append_to_response: "videos,similar,credits",
        language: "ko",
        region: "ko",
      },
    },
    function (error, response, body) {
      const data = JSON.parse(body);
      res.send(data);
    }
  );
});

app.get("/providers", async function (req, res) {
  const { movieId } = req.query;
  request(
    {
      uri: `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${key}`,
      method: "get",
      qs: {
        language: "ko",
        region: "ko",
      },
    },
    function (error, response, body) {
      const data = JSON.parse(body);
      res.send(data);
    }
  );
});

app.get("/search", async function (req, res) {
  const { query } = req.query;
  request(
    {
      uri: `https://api.themoviedb.org/3/search/movie?api_key=${key}`,
      method: "get",
      qs: {
        language: "ko",
        region: "ko",
        query: query,
      },
    },
    function (error, response, body) {
      const data = JSON.parse(body);
      res.send(data);
    }
  );
});
// 회원가입
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post("/join", (req, res) => {
  res.send(".");
});

app.listen(5000, function () {
  console.log("서버켜짐");
});
