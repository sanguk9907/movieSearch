/*
    (궁금한것)
    쿠키에 저장된 세션을 클라이언트에서도 사용가능한지
    가능하다면 로컬,세션스토리지는 사용하지 않는게 좋은지
    왜 req.session.destroy()만으로는 안지워지는지
    왜 DB와 약 3번정도 접촉하면 DB연결이 끊어지는지
    (EX)리뷰달기,좋아요누르기,파일업로드 등등
    */

const express = require("express");
const cors = require("cors");
const request = require("request");
const crypto = require("crypto");
const app = express();

const fs = require("fs");
const multer = require("multer");
const session = require("express-session");

const dir = "../client/public/img";

const storage = multer.diskStorage({
  // 파일 어디다가 저장할건지
  destination: function (req, file, cb) {
    cb(null, "../client/public/img");
  },

  // 파일 이름 중복방지
  filename: function (req, file, cb) {
<<<<<<< HEAD
    const originalname = file.originalname;
    const originArray = originalname.split(".");
    const dateTime = Date.now();

    let fileExt = originArray[originArray.length - 1];
    let resultFileName = `${dateTime}.${fileExt}`;
    console.log(resultFileName);
=======
    const dateTime = Date.now();

    const originalname = file.originalname;
    const originArray = originalname.split(".");

    let fileExt = originArray[originArray.length - 1];
    let fileName = originArray.join(".").replace(fileExt, "");
    let resultFileName = `${dateTime}_${fileName}${fileExt}`;
>>>>>>> a38084b556521f6446d5d3e5e69897702e8c3331

    cb(null, resultFileName);
  },
});
const upload = multer({ storage });

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "ASDASD",
    resave: false,
    saveUninitialized: true,
  })
);

const key = "3cf148810eae178af2afb1a072cfe76d";
//////////////////// MYSQL연결
const mysql = require("mysql2");
const DB = mysql.createPoolCluster();

DB.add("moviesearch", {
  host: "52.196.233.251",
  user: "root",
  password: "Asas4545@@",
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

      connection.release();
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

// 업데이트 만들기
function createUpdate(params) {
  const { table, data, where } = params;

  const column = Object.keys(data);
  const value = Object.values(data);

  const updateQuery = [];

  column.forEach((item, index) => {
    updateQuery.push(` ${item} = "${value[index]}"`);
  });

  const query = `UPDATE ${table} set${updateQuery} where ${where}`;
  return query;
}

function doRequest({ url, option }) {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: url,
        ...option,
      },

      function (error, response, body) {
        const movies = JSON.parse(body);

        resolve(movies);
      }
    );
  });
}

const main_api = [
  {
    category: "Popular",
    api: "movie/popular",
    label: "인기",
    params: { language: "ko" },
  },
  {
    category: "Netflix",
    api: "discover/movie",
    params: { with_watch_providers: "8", watch_region: "KR", language: "ko" },
    label: "넷플릭스",
  },
  {
    category: "Disney_Plus",
    api: "discover/movie",
    params: { with_watch_providers: "337", watch_region: "KR", language: "ko" },
    label: "디즈니플러스",
  },
  {
    category: "Watcha",
    api: "discover/movie",
    params: { with_watch_providers: "97", watch_region: "KR", language: "ko" },
    label: "왓챠",
  },
  {
    category: "NowPlaying",
    api: "movie/now_playing",
    label: "현재 상영중",
    params: { language: "ko" },
  },
  {
    category: "TopRated",
    api: "movie/top_rated",
    label: "최고의 평가",
    params: { language: "ko" },
  },
];

app.get("/main/movie", async function (req, res) {
  const result = {};

  for (let _key in main_api) {
    const { category, api, params } = main_api[_key];

    // 배열로옴
    const item = await doRequest({
      url: `https://api.themoviedb.org/3/${api}?api_key=${key}`,
      option: {
        method: "get",
        qs: params,
      },
    });
    result[category] = [];

    // API 값이 제대로 왔는지?
    if (item.results.length > 0) {
      item.results.forEach((value) => {
        result[category].push({
          movieID: value.id,
          posterImage: value.poster_path,
          title: value.title,
          background: value.backdrop_path,
        });
      });
    }
  }
  res.send(result);
});

app.get("/main/slide", async function (req, res) {
  const { itemList } = req.query;
  const result = [];

  if (!itemList) {
    return;
  } else {
    for (let movieID of itemList) {
      const items = await doRequest({
        url: `https://api.themoviedb.org/3/movie/${movieID}?api_key=${key}`,
        option: {
          method: "get",
          qs: {
            append_to_response: "videos,similar,credits",
            language: "ko",
            region: "KR",
          },
        },
      });

      const sendData = {
        movieId: items.id,
        movieTitle: items.title,
        tagLine: items.tagline,
        genres: items.genres,
        overView: items.overview,
        average: items.vote_average,
        release: items.release_date,
        background: items.backdrop_path,
      };
      result.push(sendData);
    }
  }
  res.send(result);
});

app.get("/movie/detail", async function (req, res) {
  const { movieID } = req.query;

  const result = {};

  if (movieID) {
    const items = await doRequest({
      url: `https://api.themoviedb.org/3/movie/${movieID}?api_key=${key}`,
      option: {
        method: "get",
        qs: {
          append_to_response: "videos,similar,credits",
          language: "ko",
          region: "KR",
        },
      },
    });
    const provider = await doRequest({
      url: `https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${key}`,
      option: {
        method: "get",
        qs: {
          append_to_response: "videos,similar,credits",
          language: "ko",
          region: "KR",
        },
      },
    });

    const Review = await runDB({
      database: "moviesearch",
      query: `SELECT * FROM review WHERE movieID =${movieID}`,
    });

    if (req.session.loginUser) {
      const { loginUser } = req.session;
      const likeData = !loginUser
        ? null
        : await runDB({
            database: "moviesearch",
            query: `SELECT * FROM likes WHERE user_seq=${loginUser.seq} && movieID=${movieID}`,
          });
    }

    result.movieId = items.id;
    result.movieTitle = items.title;
    result.tagLine = items.tagline;
    result.genres = items.genres;
    result.overView = items.overview;
    result.similar = items.similar;
    result.average = items.vote_average;
    result.vote_count = items.vote_count;
    result.release = items.release_date;
    result.posterImage = items.poster_path;
    result.background = items.backdrop_path;
    result.videos = items.videos;
    result.provider = !provider.results.KR
      ? null
      : provider.results.KR.flatrate;
    result.Reviews = Review;
    result.like = likeData;
  }
  res.send(result);
});

app.get("/search", async function (req, res) {
  const { query, page } = req.query;
  const data = await doRequest({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${key}`,
    option: {
      method: "get",
      qs: {
        language: "ko",
        region: "KR",
        query: query,
        page: page,
        include_adult: false,
      },
    },
  });
  res.send(data);
});

app.get("/join", (req, res) => {
  res.send("get");
});
app.post("/join", async (req, res) => {
  const { id, pw, confirmPw, nick, email, phoneNumber } = req.body;
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
  const PhoneReg = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  const IDCheck = IDReg.test(id);

  const PWCheck = PWReg.test(pw);
  const EmailCheck = EmailReg.test(email);
  const PhoneCheck = PhoneReg.test(phoneNumber);

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

    if (pw !== confirmPw) {
      (resulte.code = "fail"),
        (resulte.message =
          "비밀번호가 일치하지 않습니다 다시 한 번 확인해주세요");
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

    if (!PhoneCheck) {
      (resulte.code = "fail"),
        (resulte.message =
          "휴대폰 번호 형식이 올바르지 않습니다. 다시 한 번 확인해주세요");
      break;
    }

    const findUser = await runDB({
      database: "moviesearch",
      query: `SELECT * FROM users where userID = "${id}"`,
    });

    if (!findUser === []) {
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

    const createdUser = await runDB({
      database: "moviesearch",
      query: `SELECT * FROM users where userID = "${id}"`,
    });

    const user = {};
    user.seq = createdUser[0].seq;
    user.id = createdUser[0].userID;
    user.nick = createdUser[0].nick;
    user.email = createdUser[0].email;
    user.phoneNumber = createdUser[0].phoneNumber;
    user.userIntroduction = createdUser[0].userIntroduction;
    resulte.user = user;

    req.session.loginUser = user;
    req.session.save();
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
  };
  const examArray = [1];
  const dataSelect = await runDB({
    database: "moviesearch",
    query: `SELECT * FROM users where userID = "${id}"`,
  });

  const findUser = dataSelect[0];

  const dbSalt = !findUser ? undefined : findUser.salt;
  const dbPassword = !findUser ? undefined : findUser.password;

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

    if (findUser === undefined || findUser.userID !== id) {
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
      seq: findUser.seq,
      id: findUser.userID,
      nick: findUser.nick,
      email: findUser.email,
      phoneNumber: findUser.phoneNumber,
      userIntroduction: findUser.userIntroduction,
    };
    req.session.loginUser = resulte.user;
    req.session.save();
  }

  res.send(resulte);
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
  res.send();
});

app.put("/like", async (req, res) => {
  if (req.session.loginUser) {
    const { loginUser } = req.session;
    const { clickedLike, movieID } = req.body.data;
    const resulte = {
      code: "fail",
      message: "좋아요 목록 업데이트에 실패했습니다.",
    };

    if (clickedLike) {
      const insertQuery = createInsert({
        table: "likes",
        data: {
          movieID: movieID,
          user_seq: loginUser.seq,
        },
      });

      await runDB({
        database: "moviesearch",
        query: insertQuery,
      });

      (resulte.code = "success"),
        (resulte.message = "좋아요 목록에 추가되었습니다.");
    }

    if (!clickedLike) {
      await runDB({
        database: "moviesearch",
        query: `delete from likes where movieID =${movieID} && user_seq=${loginUser.seq}`,
      });
      (resulte.code = "success"),
        (resulte.message = "좋아요 목록에서 삭제되었습니다.");
    }

    res.send(resulte);
  }
});

app.post("/review", async (req, res) => {
  const data = req.body;
  const { user_seq, content, nick, movieID } = data;
  const insertData = {
    user_seq: user_seq,
    content: content,
    nick: nick,
    movieID: movieID,
  };
  const resulte = {
    code: "success",
    message: "리뷰가 성공적으로 남겨졌습니다.",
  };
  const examArray = [1];

  for (let key in examArray) {
    if (!user_seq) {
      (resulte.code = "fail"), (resulte.message = "로그인 후 이용해주세요");
      break;
    }

    if (content === "") {
      (resulte.code = "fail"), (resulte.message = "리뷰 내용을 입력해주세요");
      break;
    }
    const reviewInsert = createInsert({
      table: "review",
      data: insertData,
    });

    await runDB({
      database: "moviesearch",
      query: reviewInsert,
    });
    const Review = await runDB({
      database: "moviesearch",
      query: `SELECT * FROM review WHERE movieID =${movieID}`,
    });
    resulte.reviewList = Review;
  }
  res.send(resulte);
});

app.delete("/review", async (req, res) => {
  const { seq, movieID } = req.body;
  const resulte = {
    message: "리뷰를 삭제했습니다.",
  };
  await runDB({
    database: "moviesearch",
    query: `delete from review where seq = ${seq}`,
  });
  const Review = await runDB({
    database: "moviesearch",
    query: `SELECT * FROM review WHERE movieID =${movieID}`,
  });
  resulte.reviewList = Review;
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
    query: `SELECT seq,userID,nick,userIntroduction,email,phoneNumber FROM users WHERE userID="${id}"`,
  });

  const updateData = {
    userSeq: data[0].seq,
    id: data[0].userID,
    nick: data[0].nick,
    email: data[0].email,
    phoneNumber: data[0].phoneNumber,
    userIntroduction: data[0].userIntroduction,
  };

  res.send(updateData);
});

app.delete("/delete", async (req, res) => {
  const { seq, id, password } = req.body;
  const resulte = {
    code: "fail",
    message: "실패했습니다. 비밀번호를 확인해주세요",
  };

  const findUser = await runDB({
    database: "moviesearch",
    query: `select * from users where seq="${seq}" && userID="${id}"`,
  });

  const dbSalt = findUser[0].salt;
  const dbPassword = findUser[0].password;

  const passKey = crypto
    .pbkdf2Sync(password, dbSalt, 100514, 64, "sha512")
    .toString("base64");
  if (dbPassword === passKey) {
    runDB({
      data: "moviesearch",
      query: `DELETE FROM users WHERE seq=${seq} && userID="${id}" && password="${passKey}"`,
    });
    resulte.code = "success";
    resulte.message = "회원 아이디가 정상적으로 삭제되었습니다.";
  }
  res.send(resulte);
});

app.post("/file", upload.array("file"), async (req, res) => {
<<<<<<< HEAD
  if (req.session.loginUser) {
    const { loginUser } = req.session;
    const files = req?.files[0];
=======
  if (req.session.loginUser && req?.files[0]) {
    const { loginUser } = req.session;
    const files = req?.files[0];

>>>>>>> a38084b556521f6446d5d3e5e69897702e8c3331
    files.user_seq = loginUser.seq;
    const searchImage = await runDB({
      database: "moviesearch",
      query: `select * from image where user_seq = ${loginUser.seq}`,
    });

    if (searchImage.length === 0) {
      const insertQuery = createInsert({
        table: "image",
        data: files,
      });

      await runDB({
        database: "moviesearch",
        query: insertQuery,
      });
    } else {
      const updateQuery = createUpdate({
        table: "image",
        data: files,
        where: `user_seq = ${loginUser.seq}`,
      });

      await runDB({
        database: "moviesearch",
        query: updateQuery,
      });
    }
    const profileImage = await runDB({
      database: "moviesearch",
      query: `select * from image where user_seq = ${loginUser.seq}`,
    });
    res.send(profileImage[0].filename);
  }
});

app.get("/profileImage", async (req, res) => {
  if (req.session.loginUser) {
    const { loginUser } = req.session;
    const profileImage = await runDB({
      database: "moviesearch",
      query: `select * from image where user_seq = ${loginUser.seq}`,
    });
    const filename = profileImage.length === 0 ? "" : profileImage[0].filename;
    res.send(filename);
  }
});

app.post("/changepassword", async (req, res) => {
  if (req.session.loginUser) {
    const { loginUser } = req.session;
    const { password, newPassword, newPasswordConfirm } = req.body;
    const resulte = {
      code: "success",
      message: "비밀번호가 성공적으로 수정되었습니다.",
    };
    const aa = [1];

    const PWReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    const PWCheck = PWReg.test(password);
    const newPWCheck = PWReg.test(newPassword);

    const dataSelect = await runDB({
      database: "moviesearch",
      query: `SELECT * FROM users where seq = ${loginUser.seq}`,
    });

    const passKey = crypto
      .pbkdf2Sync(password, dataSelect[0].salt, 100514, 64, "sha512")
      .toString("base64");

    for (let key in aa) {
      if (password === newPassword) {
        (resulte.code = "fail"),
          (resulte.message =
            "새로운 비밀번호는 현재 비밀번호와 다르게 만들어주세요");
        break;
      }

      if (!PWCheck || !newPWCheck) {
        (resulte.code = "fail"),
          (resulte.message =
            "비밀번호는 영어와 숫자를 포함한 8글자 이상이어야 합니다");
        break;
      }

      if (passKey !== dataSelect[0].password) {
        (resulte.code = "fail"),
          (resulte.message =
            "현재 비밀번호가 틀립니다 다시 한 번 확인해주세요");
        break;
      }

      if (newPassword !== newPasswordConfirm) {
        (resulte.code = "fail"),
          (resulte.message = "새 비밀번호가 틀립니다 다시 한 번 확인해주세요");
        break;
      }

      const createnewpassword = await new Promise((resolve) => {
        crypto.randomBytes(64, (err, buf) => {
          if (err) {
            resulte.err = err;
          }
          const salt = buf.toString("base64");
          crypto.pbkdf2(newPassword, salt, 100514, 64, "sha512", (err, key) => {
            resolve({
              password: key.toString("base64"),
              salt: salt,
            });
          });
        });
      });
      const newpassword = createUpdate({
        table: "users",
        data: createnewpassword,
        where: `seq = ${loginUser.seq}`,
      });
      await runDB({
        database: "moviesearch",
        query: newpassword,
      });
    }

    res.send(resulte);
  }
});

app.listen(5000, function () {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  console.log("서버켜짐");
});
