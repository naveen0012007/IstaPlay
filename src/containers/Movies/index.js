import React, { useEffect, useState } from "react";
import Navbar from "../../component/NavBar";
import stangerThings from "../../assets/img/stangerThings.svg";
import "./movies.css";
import Card from "../../component/Card";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

const Movies = ({ logOut }) => {
  const navigate = useNavigate();
  const params = useParams();
  // let userPage = params.page;
  const [showSearch, setshowSearch] = useState(true);
  const [showSearchTask, setshowSearchTask] = useState(true);
  const [movieDate, setMovieDate] = useState();
  const [movieList, setmovieList] = useState();
  let x = JSON.parse(localStorage.getItem("data"));
  console.log("x--------------------------", x);
  const [input, setInput] = useState(x?.input ? x.input : null);
  const [moviePage, setMoviePage] = useState(x?.moviePage ? x.moviePage : 1);

  useEffect(() => {
    console.log("input in useEffect", input);
    input ? searchDetailsFromAPI(input) : getDataFromMovieDetails();
  }, [moviePage, input]);

  const getPageNo = (userPage) => {
    navigate(`/movies`);
  };

  const handleClick = (id) => {
    localStorage.setItem("data", JSON.stringify({ input: input, moviePage }));
    localStorage.setItem("id", JSON.stringify(id));
  };

  function getStorageValue() {
    // getting stored value
    const saved = localStorage.getItem("data");
    const initial = JSON.parse(saved);
    return initial || "";
  }

  async function getDataFromMovieDetails() {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&page=${moviePage}`
    );
    const data = await res.json();

    console.log("data--------------", data);
    getPageNo(data.page);
    setMovieDate(data);
    setmovieList(data.results);
  }
  // ------------------------------------page-----------------------
  async function searchDetailsFromAPI(value) {
    console.log(
      "searchDetailsFromAPI------true-----",
      moviePage,
      input,
      showSearchTask
    );

    if (value) {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US&query=${value}&page=${moviePage}&include_adult=false`
      );
      const data = await res.json();
      console.log("searchApi-------true--", data);
      setshowSearchTask(false);
      setMovieDate(data);
      setmovieList(data.results);
    } else {
      console.log("searchDetailsFromAPI------false-----");
      getPageNo(moviePage);
      setshowSearchTask(true);
    }
  }

  // value from input
  function valueFromInput(e) {
    console.log("valueFromInput---------------", e.target.value);
    if (e.target.value) {
      getPageNo(moviePage);
      localStorage.setItem(
        "data",
        JSON.stringify({ input: e.target.value, moviePage })
      );
      console.log("valueFromInput--------------true-", e.target.value);
      setInput(e.target.value);
      setMoviePage(1);

      searchDetailsFromAPI(e.target.value);
    } else {
      console.log("valueFromInput--------------fal-", e.target.value);
      setInput("");
      getPageNo(1);
      getDataFromMovieDetails();
      localStorage.clear();
    }
  }

  // clickOnPage
  const clickOnPage = (e) => {
    if (input) {
      setMoviePage(e.selected + 1);
      console.log({ moviePage });
      getPageNo(e.selected + 1);
    } else {
      setMoviePage(e.selected + 1);
      getPageNo(e.selected + 1);
      searchDetailsFromAPI();
    }
    localStorage.setItem(
      "data",
      JSON.stringify({ input: input, moviePage: e.selected + 1 })
    );
  };
  return (
    <div>
      <Navbar
        showSearch={showSearch}
        valueFromInput={valueFromInput}
        movieSearchDetails={input}
        setmovieSearchDetails={setInput}
        logOut={logOut}
      />
      <div className="bannerImage">
        <img className="bannerImgTag" src={stangerThings} alt="trending " />
      </div>
      <div>
        <p className="trending">
          {console.log("11111111111----", input)}
          {input ? `Search page ${input}` : "Trending"}
        </p>
      </div>

      <div className="cardBox">
        {movieList?.map((item, i) => {
          return (
            <Card
              key={item.id}
              onClick={() => {
                handleClick(item.id);
              }}
              id={item.id}
              item={item}
            />
          );
        })}
      </div>

      <div className="pageNo">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          forcePage={moviePage - 1}
          pageCount={movieDate?.total_pages}
          previousLabel="<"
          className="page"
          previousLinkClassName="previousLinkClassName"
          activeClassName="activeClassName"
          activeLinkClassName="activeLinkClassName"
          onPageActive={1}
          onPageChange={(e) => {
            console.log(e);
            clickOnPage(e);
          }}
        />
      </div>
    </div>
  );
};

export default Movies;

// const getDashBorad = async () => {
//   const res = await fetch(
//     "https://api.themoviedb.org/3/trending/movie/day?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&page=1"
//   );
//   const data = await res.json();
//   setmovieData(data);
//   console.log("dat--------------------", movieData);
// };
// useEffect(() => {
//   const savedItem = localStorage.getItem("data");
//   const parsedItem = JSON.parse(savedItem);
//   console.log("name", parsedItem.input, parsedItem.moviePage);

//   if (parsedItem) {
//     setInput(parsedItem.input);
//     setMoviePage(parsedItem.moviePage);
//   }
//   searchDetailsFromAPI();
// }, [1]);
// if (name) {
//   setInput(name.input);
//   getPageNo(name.moviePage);
//   console.log(' "searchDetailsFromAPI------', input);
// }
