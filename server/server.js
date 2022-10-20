const express = require("express");
const cors = require("cors");
const request = require("request");
const crypto = require("crypto");
const { read } = require("fs");
const { resolve } = require("path");
const { rejects } = require("assert");
const app = express();
app.use(cors());
app.use(express.json());

const db = [
  {
    user: {
      userID: "아이디",
      hashedPassword: "다져진비번",
      nick: "닉네임",
      salt: "소금",
    },
  },
];

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

app.get("/join", (req, res) => {
  res.send("get");
});
app.post("/join", (req, res) => {
  const { id, pw, nick } = req.body;
  const resulte = {
    code: "success",
    message: "회원가입이 성공적으로 완료되었습니다.",
  };
  const examArray = [1];

  // salt,HashedPassword 만들기
  const createHashedPassword = (id, password, nick) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        resulte.err = err;
      }
      const salt = buf.toString("base64");
      crypto.pbkdf2(password, salt, 100514, 64, "sha512", (err, key) => {
        db.push({
          user: {
            userID: id,
            hashedPassword: key.toString("base64"),
            salt: salt,
            nick: nick,
          },
        });
      });
    });
  };

  const findUserID = db.find((item) => {
    return item.user.userID === id;
  });

  for (let key in examArray) {
    if (id === "") {
      (resulte.code = "fail"), (resulte.message = "아이디를 입력해주세요");
      break;
    }

    if (pw === "") {
      (resulte.code = "fail"), (resulte.message = "비밀번호를 입력해주세요");
      break;
    }

    if (nick === "") {
      (resulte.code = "fail"), (resulte.message = "닉네임을 입력해주세요");
      break;
    }

    if (findUserID) {
      (resulte.code = "fail"),
        (resulte.message = "이미 존재하는 아이디입니다.");
      break;
    }
    createHashedPassword(id, pw, nick);
  }
  res.send(resulte);
});

app.get("/login", (req, res) => {
  res.send("get");
});
app.post("/login", (req, res) => {
  const { id, pw } = req.body;

  const resulte = {
    code: "success",
    message: "성공적으로 로그인 되었습니다.",
  };
  const examArray = [1];
  const findUserID = db.find((item) => {
    return item.user.userID === id;
  });

  const dbSalt = !findUserID ? undefined : findUserID.user.salt;
  const dbPassword = !findUserID ? undefined : findUserID.user.hashedPassword;

  const passKey = !dbSalt
    ? ""
    : crypto.pbkdf2Sync(pw, dbSalt, 100514, 64, "sha512").toString("base64");

  for (let key in examArray) {
    if (id === "") {
      resulte.code = "fail";
      resulte.message = "아이디를 입력해주세요";
      break;
    }

    if (pw === "") {
      (resulte.code = "fail"), (resulte.message = "비밀번호를 입력해주세요");
      break;
    }

    if (findUserID === undefined || findUserID.user.userID !== id) {
      resulte.code = "fail";
      resulte.message =
        "등록되지 않은 아이디이거나, 틀린 아이디입니다 다시 한 번 확인해주세요.";
      break;
    }

    if (passKey !== dbPassword) {
      resulte.code = "fail";
      resulte.message = "비밀번호가 올바르지 않습니다";
      break;
    }
  }

  res.send(resulte);
});

app.listen(5000, function () {
  console.log("서버켜짐");
});
