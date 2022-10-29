import React from "react";

function Review() {
  return (
    <div className="review">
      <b>리뷰</b>
      <ul className="review-box">
        <li className="review-content">
          <p>아이디(혹은닉네임) : 리뷰 내용</p>
        </li>
        <li className="review-content">
          <p>아이디(혹은닉네임) : 리뷰 내용</p>
        </li>
        <li className="review-content">
          <p>아이디(혹은닉네임) : 리뷰 내용</p>
        </li>
      </ul>
      <form>
        <input type="text" placeholder="리뷰 내용을 입력하세요"></input>
        <button>확인</button>
      </form>
    </div>
  );
}

export default Review;
