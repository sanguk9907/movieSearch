import axios from "../apis/axios";
import React from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import { StoreContext } from "../App";

function Review({ movieID, Reviews }) {
  const { loginUser } = React.useContext(StoreContext);
  const [review, setReview] = React.useState({
    user_seq: loginUser.seq,
    nick: loginUser.nick,
    movieID: movieID,
    content: "",
    review_seq: "",
  });
  const [reviewList, setReviewList] = React.useState([]);

  const writeReview = async () => {
    await axios({
      url: "/review",
      method: "post",
      data: review,
    })
      .then(({ data }) => {
        setReviewList(data.reviewList);
        alert(data.message);
      })
      .catch((err) => {
        console.log("에러 : ", err);
      });
  };

  const deleteReview = async (seq) => {
    await axios({
      url: "/review",
      method: "delete",
      data: {
        seq: seq,
        movieID: movieID,
      },
    }).then(({ data }) => {
      setReviewList(data.reviewList);
      alert(data.message);
    });
  };

  React.useEffect(() => {
    setReviewList(Reviews);
  }, [movieID]);

  return (
    <div className="review">
      <b>리뷰</b>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
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
                      deleteReview(item.seq);
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
