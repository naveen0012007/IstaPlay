import Navbar from "../../component/NavBar";
import "./moviesDetails.css";
import leftArrow from "../../assets/img/leftArrow.svg";
import bigPlaybtn from "../../assets/img/bigPlaybtn.svg";

import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MoviesDetails = () => {
  const [movieDetails, setmovieDetails] = useState();
  const [showVideo, setShowVideo] = useState();
  const [showModel, setShoeModel] = useState(true);
  const params = useParams();
  let year;
  const navigate = useNavigate();
  const getMovieDetail = () => {
    let userId = params.id;
    console.log("Card--------", { userId });
    getMovieDetails(userId);
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  const getMovieDetails = async (userId) => {
    console.log("Card in movie --------", userId);
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${userId}?api_key=05097a4b5617debcdedd3ff7d7a01ee2&language=en-US`
    );
    const data = await res.json();
    console.log("data--------------", data);
    setmovieDetails(data);

    console.log("year----------", year);
    videoLink(userId);
  };

  const videoLink = async (userId) => {
    console.log("Card in video --------", userId);
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${userId}/videos?api_key=05097a4b5617debcdedd3ff7d7a01ee2&language=en-US`
    );
    const data = await res.json();
    console.log(data);
    console.log("data.results[0]--------------", data.results[0]);
    console.log("video--------------", data.results[0]?.key);
    setShowVideo(data.results[0]?.key);
  };
  const lang = (val) => {
    console.log(val);
    let tex = "";
    val?.forEach((element) => {
      tex = element.english_name + "," + tex;
    });

    return tex;
  };
  const handleClick = () => {
    console.log("handleClick");
    setShoeModel(!showModel);
  };
  const handleClickClose = () => {
    setShowVideo(null);
  };
  return (
    <div
      className="dashBoradBackGround"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}") `,
      }}
    >
      <Navbar />
      <div style={{}} className="dashBoradImage">
        <div className="dashBoardContainer">
          <div className="dashBoardText">
            <div className="arrowKey">
              <img
                onClick={() => navigate(-1)}
                src={leftArrow}
                alt="left Arrow"
              ></img>
            </div>

            <div className="dashBoardDetails">
              <h1 className="movieName">{movieDetails?.title}</h1>
              <div className="dashBoardRating">
                <p>Rating:</p>
                <p>{(movieDetails?.vote_average / 2).toFixed(2)}</p>
              </div>

              <p className="dashBoardContent">{movieDetails?.overview}</p>
            </div>
            <div className="dashBoardDate">
              <p>Release Date</p>
              {}
              <p>
                {(year = new Date(movieDetails?.release_date).getFullYear())}
              </p>
            </div>
            <div className="dashBoardLang">
              <p>Orginal Language</p>
              <p>{lang(movieDetails?.spoken_languages)}</p>
            </div>
          </div>
          {/*  img*/}
          <div className="bigPlaybtn">
            <img
              onClick={() => handleClick()}
              src={bigPlaybtn}
              alt="bigPlaybtn"
              className="bigPlaybtn"
            />
          </div>
          <div
            style={{ display: showModel ? "none" : "block" }}
            id="myModal"
            class="modal"
          >
            <div onClick={handleClick} class="modal-content">
              <span onClick={handleClickClose} class="close">
                &times;
              </span>
              {showVideo && (
                <iframe
                  className="videoScreen"
                  src={`https://www.youtube.com/embed/${showVideo}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesDetails;
