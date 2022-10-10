import React from "react";
import MovieDetail from "./MovieDetail";

function PersonCard({ person }) {
  const known = (x) => {
    const major = [];
    x.known_for.forEach((item) => {
      if (item.media_type === "tv") {
        return major.push(item.name);
      } else {
        return major.push(item.title);
      }
    });

    return `${major[0]}, ${major[1]}, ${major[2]}`;
  };
  console.log(person);
  return (
    <div className="person-warp">
      {person &&
        person.map((item, index) => {
          return (
            <div key={`person-${index}`} className="person-card">
              <div
                className="img-box"
                style={{
                  backgroundImage: `url("https://image.tmdb.org/t/p/w500/${item.profile_path}")`,
                }}
              ></div>
              <div className="text-box">
                <p className="name">{item.name}</p>
                <p className="know-for">
                  대표작
                  <br />
                  {known(item)}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default PersonCard;
