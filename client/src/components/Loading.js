import React from "react";
import Lottie from "lottie-react";
import animationData from "../helper/124534-tricube-spinner-1.json";

function Loading() {
  return (
    <div className="loading-wrap">
      <Lottie animationData={animationData} />
      <p style={{ color: "#fff" }}>잠시만 기다려주세요</p>
    </div>
  );
}

export default Loading;
