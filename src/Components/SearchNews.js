import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";

import News from "./News";

const SearchNews = () => {
  const [search, setSearch] = useState("");
  const [newsArray, setNewsArray] = useState([]);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  async function fetchNews() {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/news?search=${search}`
      );

      if (data) {
        if (data.data.length === 0) {
          setNoResult(true);
        } else {
          setNoResult(false);
          setNewsArray(data.data);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className="content-wrapper search-container">
      <form className="search-box" onSubmit={(e) => handleSearchSubmit(e)}>
        <div className="parent-search">
          <input
            className="search-bar"
            type="text"
            placeholder="Search News"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="clear-search-btn" onClick={(e) => setSearch("")}>
            <i className=" clear-search-icon fa-solid fa-xmark"></i>
          </button>
        </div>
        <button className="search-submit-btn" type="submit">
          Search
        </button>
      </form>

      <div className="search-result-box">
        {!noResult ? (
          newsArray.map((item, index) =>
            item.image ? <News {...item} /> : null
          )
        ) : (
          <h4>No News Found</h4>
        )}
      </div>
    </div>
  );
};

export default SearchNews;
