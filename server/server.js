const express = require("express");
const cors = require("cors");
const request = require("request");
const crypto = require("crypto");
const app = express();
app.use(cors());
app.use(express.json());
const key = "3cf148810eae178af2afb1a072cfe76d";
//////////////////// MYSQL연결
const mysql = require("mysql2");
const { json, query } = require("express");
const DB = mysql.createPoolCluster();

DB.add("moviesearch", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "moviesearch",
  port: 3306,
});
//////////////////// MYSQL연결

// salt,HashedPassword 만들기
async function cerateUserInfo(parmas) {
  const { id, password, nick, email, phoneNumber } = parmas;
  const userInfo = await new Promise((resolve) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        resulte.err = err;
      }
      const salt = buf.toString("base64");
      crypto.pbkdf2(password, salt, 100514, 64, "sha512", (err, key) => {
        resolve({
          userID: id,
          password: key.toString("base64"),
          salt: salt,
          nick: nick,
          email: email,
          phoneNumber: phoneNumber,
        });
      });
    });
  });
  return userInfo;
}

////////////디비 실행
async function runDB(params) {
  const { database, query } = params;
  const data = await new Promise((resolve) => {
    DB.getConnection(database, (error, connection) => {
      if (error) {
        console.log("데이터베이스 연결 오류 ===>", error);
        return;
      }
      connection.query(query, (error, data) => {
        if (error) {
          console.log("쿼리 오류 ===>", error);
          return;
        }

        resolve(data);
      });
    });
  });

  return data;
}

////////////인서트 만들기
function createInsert(params) {
  const { table, data } = params;

  const column = Object.keys(data);
  const value = Object.values(data);

  const query = `INSERT INTO ${table}(${column.join(",")}) VALUES('${value.join(
    "','"
  )}')`;

  return query;
}

app.get("/mainPageData", async function (req, res) {
  const { category } = req.query;
  request(
    {
      uri: `https://api.themoviedb.org/3/${category}?api_key=${key}`,
      method: "get",
      qs: { language: "ko" },
    },
    function (error, response, body) {
      const movies = JSON.parse(body);
      const { results } = movies;
      const sendData = [];
      results.forEach((item) => {
        sendData.push({
          movieID: item.id,
          posterImage: item.poster_path,
          title: item.title,
          background: item.backdrop_path,
        });
      });
      res.send(sendData);
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
      const sendData = {
        movieId: data.id,
        movieTitle: data.title,
        tagLine: data.tagline,
        genres: data.genres,
        overView: data.overview,
        similar: data.similar,
        average: data.vote_average.toFixed(1),
        vote_count: data.vote_count,
        release: data.release_date,
        posterImage: data.poster_path,
        background: data.backdrop_path,
        videos: data.videos,
      };
      res.send(sendData);
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
  const { query, page } = req.query;
  request(
    {
      uri: `https://api.themoviedb.org/3/search/movie?api_key=${key}`,
      method: "get",
      qs: {
        language: "ko",
        region: "ko",
        query: query,
        page: page,
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
app.post("/join", async (req, res) => {
  const { id, pw, nick, email, phoneNumber } = req.body;
  const resulte = {
    code: "success",
    message: "회원가입이 성공적으로 완료되었습니다.",
  };
  const examArray = [1];

  // 회원가입 정규표현식

  // 하나이상의 대소문자,숫자 8자 이상(특수문자X)
  const IDReg = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // 하나이상의 대소문자,숫자 8자 이상(특수문자O)
  const PWReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const EmailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const IDCheck = IDReg.test(id);
  const PWCheck = PWReg.test(pw);
  const EmailCheck = EmailReg.test(email);

  for (let key in examArray) {
    if (id === "") {
      (resulte.code = "fail"), (resulte.message = "아이디를 입력해주세요");
      break;
    }

    if (!IDCheck) {
      (resulte.code = "fail"),
        (resulte.message =
          "아이디는 영어와 숫자만을 포함한 8글자 이상이어야 합니다");
      break;
    }

    if (pw === "") {
      (resulte.code = "fail"), (resulte.message = "비밀번호를 입력해주세요");
      break;
    }

    if (!PWCheck) {
      (resulte.code = "fail"),
        (resulte.message =
          "비밀번호는 영어와 숫자, 특수문자만을 포함한 8글자 이상이어야 합니다");
      break;
    }

    if (nick === "") {
      (resulte.code = "fail"), (resulte.message = "닉네임을 입력해주세요");
      break;
    }

    if (email === "") {
      (resulte.code = "fail"), (resulte.message = "이메일을 입력해주세요");
      break;
    }
    if (!EmailCheck) {
      (resulte.code = "fail"),
        (resulte.message =
          "이메일 형식이 올바르지 않습니다. 다시 한 번 확인해주세요");
      break;
    }

    const dataSelect = await runDB({
      database: "moviesearch",
      query: "SELECT * FROM users",
    });

    const findUserID = dataSelect.find((item) => {
      return item.userID === id;
    });

    if (findUserID) {
      (resulte.code = "fail"),
        (resulte.message = "이미 존재하는 아이디입니다.");
      break;
    }

    const userInfo = await cerateUserInfo({
      id: id,
      password: pw,
      nick: nick,
      email: email,
      phoneNumber: phoneNumber,
    });
    const insertQuery = createInsert({
      table: "users",
      data: userInfo,
    });

    await runDB({
      database: "moviesearch",
      query: insertQuery,
    });
  }
  res.send(resulte);
});

app.get("/login", (req, res) => {
  res.send("get");
});
app.post("/login", async (req, res) => {
  const { id, pw } = req.body;

  const resulte = {
    code: "success",
    message: "성공적으로 로그인 되었습니다.",
    user: null,
    liked: null,
  };
  const examArray = [1];
  const dataSelect = await runDB({
    database: "moviesearch",
    query: "SELECT * FROM users",
  });

  const likedata = await runDB({
    database: "moviesearch",
    query: `select movieID from lieked inner join users on lieked.userID = users.userID where lieked.userID ="${id}"`,
  });

  const userLikeArray = [];

  likedata.forEach((item) => {
    userLikeArray.push(item.movieID);
  });
  const findUserID = dataSelect.find((item) => {
    return item.userID === id;
  });

  const dbSalt = !findUserID ? undefined : findUserID.salt;
  const dbPassword = !findUserID ? undefined : findUserID.password;

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

    if (findUserID === undefined || findUserID.userID !== id) {
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

    resulte.user = {
      id: findUserID.userID,
      nick: findUserID.nick,
      liked: userLikeArray,
      email: findUserID.email,
      phoneNumber: findUserID.phoneNumber,
      userIntroduction: findUserID.userIntroduction,
    };
    resulte.liked = userLikeArray;
  }

  res.send(resulte);
});

app.get("/like", (req, res) => {
  res.send("likeget");
});
app.put("/like", async (req, res) => {
  const { clickedLike, movieID, userID } = req.body;

  if (clickedLike) {
    const insertQuery = createInsert({
      table: "lieked",
      data: {
        movieID: movieID,
        userID: userID,
      },
    });

    await runDB({
      database: "moviesearch",
      query: insertQuery,
    });

    const data = await runDB({
      database: "moviesearch",
      query: "select * from lieked",
    });

    const likedMovieID = [];

    data.forEach((item) => {
      likedMovieID.push(item.movieID);
    });
    res.send(likedMovieID);

    return;
  }

  if (!clickedLike) {
    await runDB({
      database: "moviesearch",
      query: `delete from lieked where movieID =${movieID} && userID ="${userID}"`,
    });
    const data = await runDB({
      database: "moviesearch",
      query: "select * from lieked",
    });
    const unlikedMovieID = [];

    data.forEach((item) => {
      unlikedMovieID.push(item.movieID);
    });
    res.send(unlikedMovieID);
  }
});

app.get("/review", async (req, res) => {
  const { movieId } = req.query;
  if (movieId === undefined) {
    res.send();
    return;
  } else {
    const callReview = await runDB({
      database: "moviesearch",
      query: `SELECT * FROM review WHERE movieID =${movieId}`,
    });
    res.send(callReview);
  }
});

app.post("/review", async (req, res) => {
  const data = req.body;

  const { userID, content } = data;
  const resulte = {
    code: "success",
    message: "리뷰가 성공적으로 남겨졌습니다.",
  };
  const examArray = [1];

  for (let key in examArray) {
    if (userID === "") {
      (resulte.code = "fail"), (resulte.message = "로그인 후 이용해주세요");
      break;
    }

    if (content === "") {
      (resulte.code = "fail"), (resulte.message = "리뷰 내용을 입력해주세요");
      break;
    }
    const reviewInsert = createInsert({
      table: "review",
      data: data,
    });

    await runDB({
      database: "moviesearch",
      query: reviewInsert,
    });
  }
  res.send(resulte);
});

app.get("/profile", async (req, res) => {
  const { id, nick, userIntroduction } = req.query;
  await runDB({
    database: "moviesearch",
    query: `update users set userIntroduction="${userIntroduction}",nick="${nick}" where userID="${id}"`,
  });

  const data = await runDB({
    database: "moviesearch",
    query: `SELECT userID,nick,userIntroduction,email,phoneNumber FROM users WHERE userID="${id}"`,
  });

  const updateData = {
    id: data[0].userID,
    nick: data[0].nick,
    email: data[0].email,
    phoneNumber: data[0].phoneNumber,
    userIntroduction: data[0].userIntroduction,
  };
  res.send(updateData);
});

app.listen(5000, function () {
  console.log("서버켜짐");
});
