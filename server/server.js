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
  const { id, password, nick } = parmas;
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
        });
      });
    });
  });
  return userInfo;
}
// salt,HashedPassword 만들기

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
////////////디비 실행

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
////////////인서트 만들기

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
app.post("/join", async (req, res) => {
  const { id, pw, nick } = req.body;
  const resulte = {
    code: "success",
    message: "회원가입이 성공적으로 완료되었습니다.",
  };
  const examArray = [1];

  const dataSelect = await runDB({
    database: "moviesearch",
    query: "SELECT * FROM users",
  });

  const findUserID = dataSelect.find((item) => {
    return item.userID === id;
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

    const userInfo = await cerateUserInfo({
      id: id,
      password: pw,
      nick: nick,
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
  };
  const examArray = [1];
  const dataSelect = await runDB({
    database: "moviesearch",
    query: "SELECT * FROM users",
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
      id: id,
      nick: findUserID.nick,
    };
  }

  res.send(resulte);
});

app.listen(5000, function () {
  console.log("서버켜짐");
});
