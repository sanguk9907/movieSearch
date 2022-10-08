const express = require("express");
const cors = require("cors");
const request = require("request");
const app = express();

// const DB = {
//   apart: [],
// };

app.use(cors());

app.get("/API", async function (req, res) {
  // if (DB.apart.length > 0) {
  //   res.send(DB.apart);
  //   return;
  // }
  console.log(req.query);
  request(
    {
      uri: "https://api.themoviedb.org/3/movie/985939?api_key=3cf148810eae178af2afb1a072cfe76d&append_to_response=videos,similar,credits&language=ko&region=ko",
      method: "get",
      qs: {},
    },
    function (error, response, body) {
      const data = JSON.parse(body);
      // console.log(data);
      res.send(data);
    }
  );
});

app.listen(5000, function () {
  console.log("서버켜짐");
});
