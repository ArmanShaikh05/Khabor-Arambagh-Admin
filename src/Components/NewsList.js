import React, { useEffect, useReducer, useState } from "react";
import News from "./News";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const NewsList = () => {
  const { search } = useLocation();
  const [noResult, setNoResult] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loader,setLoader] = useState(false)
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const fetchPost = async () => {
    setLoader(true)
    const res = await axios.get(`${process.env.REACT_APP_SERVER
}/news` + search);
    if (res.data.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }
    setPosts(res.data);
    setLoader(false)
  };

  useEffect(() => {
    window.scrollTo(0,0)
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, search]);

  return (
    <div className="content-wrapper custom-scroolbar">
      <div className="newsCardList">
        {loader?<Loader />:!noResult ? (
          posts.map((post, index) => (
            <News {...post} key={index} forceUpdate={forceUpdate} />
          ))
        ) : (
          <h1>No News Found</h1>
        )}
      </div>
    </div>
  );
};

export default NewsList;
