import React from "react";

function Unchange({ label, content, description }) {
  return (
    <>
      <label>{label}</label>
      <h3
        style={{
          color: "#fff",
          fontSize: "20px",
        }}
      >
        {content}
      </h3>
      <p>{description}</p>
    </>
  );
}

export default Unchange;
