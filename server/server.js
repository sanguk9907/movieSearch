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
    cb(null, file.fieldname + "_" + Date.now() + ".jpg");
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
});

app.get("/like", async (req, res) => {
  const { loginUser } = req.session;
  const { movieID } = req.query;
  if (!loginUser) {
    res.send("");
    return;
  } else {
    const likeData = await runDB({
      database: "moviesearch",
      query: `SELECT * FROM likes WHERE user_seq=${loginUser.seq} && movieID=${movieID}`,
    });

    res.send(likeData[0]);
  }
});
app.put("/like", async (req, res) => {
  const { loginUser } = req.session;
  const { clickedLike, movieID } = req.body;
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
});

app.get("/review", async (req, res) => {
  const { movieId } = req.query;
  const callReview = await runDB({
    database: "moviesearch",
    query: `SELECT * FROM review WHERE movieID =${movieId}`,
  });
  res.send(callReview);
});

app.post("/review", async (req, res) => {
  const { user_seq, content, nick, movieID } = req.body;
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
  }
  res.send(resulte);
});

app.delete("/review", async (req, res) => {
  const { user_seq, review_seq, movieID } = req.body;
  if (!review_seq) {
    return;
  } else {
    await runDB({
      database: "moviesearch",
      query: `delete from review where movieID = ${movieID} && user_seq =${user_seq} && seq = ${review_seq}`,
    });
    res.send("리뷰를 삭제했습니다.");
  }
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
  const { loginUser } = req.session;
  const files = req?.files[0];
  files.user_seq = loginUser.seq;
  const searchImage = await runDB({
    database: "moviesearch",
    query: `select * from image where user_seq = ${loginUser.seq}`,
  });

  if (searchImage.length === 0) {
    console.log("인서트 실행됨");
    const insertQuery = createInsert({
      table: "image",
      data: files,
    });

    await runDB({
      database: "moviesearch",
      query: insertQuery,
    });
  } else {
    console.log("업데이트 실행ㅇ됨");
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
  console.log(profileImage[0].filename);
  res.send(profileImage[0].filename);
});

app.get("/profileImage", async (req, res) => {
  const { loginUser } = req.session;
  const profileImage = await runDB({
    database: "moviesearch",
    query: `select * from image where user_seq = ${loginUser.seq}`,
  });
  const filename = profileImage.length === 0 ? "" : profileImage[0].filename;
  res.send(filename);
});

app.post("/changepassword", async (req, res) => {
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
    console.log("바꾸기전" + dataSelect[0].password);
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
        (resulte.message = "현재 비밀번호가 틀립니다 다시 한 번 확인해주세요");
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
    console.log("바꾼" + dataSelect[0].password);
  }

  res.send(resulte);
});

app.listen(5000, function () {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  console.log("서버켜짐");
});
