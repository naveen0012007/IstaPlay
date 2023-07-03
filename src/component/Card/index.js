import React from "react";
import playbtn from "../../assets/img/playbtn.svg";
import { Link } from "react-router-dom";
import "./card.css";
// import StarImg from "../../component/StarImg";
import noImage from "../../assets/img/noImage.jpg";
import ReactStars from "react-rating-stars-component";
const Card = ({ onClick, item, id }) => {
  return (
    <div className="card">
      <div className="cardImage">
        <img
          className="poster_path"
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
              : noImage
          }
          alt="not a tiger "
        />
      </div>

      <div className="cardText">
        <div className="cardContent">
          <p className="movieTitle">{item.title}</p>
          <div className="starBox">
            <ReactStars
              count={(item?.vote_average / 2).toFixed(1)}
              edit={false}
              size={24}
              isHalf={true}
              // halfIcon={false}
              color={"#ffd700"}
            />
            <p>{(item?.vote_average / 2).toFixed(1)}/5</p>
          </div>
        </div>
        <div>
          <Link to={`/moviesDetails/${id}`}>
            <img
              onClick={() => onClick()}
              className="playBtn"
              src={playbtn}
              alt="not a playbtn"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
