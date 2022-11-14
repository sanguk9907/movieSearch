import axios from "axios";
import React from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import { StoreContext } from "../App";

function Review(movieId) {
  const { loginUser } = React.useContext(StoreContext);
  const [review, setReview] = React.useState({
    user_seq: loginUser.seq,
    nick: loginUser.nick,
    movieID: movieId.movieId,
    content: "",
    review_seq: "",
  });
  const [reviewList, setReviewList] = React.useState([]);

  const writeReview = async () => {
    await axios({
      url: "http://localhost:5000/review",
      method: "post",
      data: review,
    })
      .then(({ data }) => {
        alert(data.message);

        getReview();
      })
      .catch((err) => {
        console.log("에러 : ", err);
      });
  };

  const getReview = async () => {
    await axios({
      url: "http://localhost:5000/review",
      method: "get",
      params: movieId,
    }).then(({ data }) => {
      setReviewList(data);
    });
  };

  const deleteReview = async () => {
    await axios({
      url: "http://localhost:5000/review",
      method: "delete",
      data: review,
    }).then(({ data }) => {
      alert(data);
      getReview();
    });
  };

  React.useEffect(() => {
    deleteReview();
  }, [review.review_seq]);

  React.useEffect(() => {
    getReview();
  }, []);

  return (
    <div className="review">
      <b>리뷰</b>
      <Form
        onSubmit={(e) => {
          writeReview();
          document.querySelector(".reviewText > textarea").value = "";
        }}
      >
        <Form.TextArea
          className="reviewText"
          value={review.content}
          onChange={(e) => {
            const cloneReview = { ...review };
            cloneReview.content = e.target.value;
            setReview(cloneReview);
          }}
          placeholder="리뷰 내용을 입력해주세요"
        />
        <Button inverted color="red">
          확인
        </Button>
      </Form>

      <ul className="review-box">
        <li className="review-content">
          <p>아이디(혹은닉네임) : 리뷰 내용</p>
        </li>
        <li className="review-content">
          <p>아이디(혹은닉네임) : 리뷰 내용</p>
        </li>
        {reviewList &&
          reviewList.map((item, index) => {
            return (
              <li key={`review-${index}`} className="review-content">
                {item.user_seq === loginUser.seq ? (
                  <Icon
                    onClick={() => {
                      const cloneReview = { ...review };
                      cloneReview.review_seq = item.seq;
                      setReview(cloneReview);
                    }}
                    style={{
                      position: "inherit",
                      float: "right",
                      fontSize: "16px",
                    }}
                    name="close"
                  />
                ) : (
                  ""
                )}

                <p>
                  {item.nick} : {item.content}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Review;
