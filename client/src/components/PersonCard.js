import React from "react";
import MovieDetail from "./MovieDetail";

function PersonCard({ person }) {
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
                  대표영화 :<br />
                  {`${item.known_for[0].title} , ${item.known_for[1].title} , ${item.known_for[2].title}`}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default PersonCard;
