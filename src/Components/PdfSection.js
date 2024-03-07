import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import NewsPaperCard from "./NewsPaperCard";

const PdfSection = () => {
  const [newspapers, setNewspapers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetchNewspapers();
    setLoader(false);
  }, [reducerValue, loader]);

  const fetchNewspapers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/newspaper`
      );
      setNewspapers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content-wrapper newspaper-section ">
      {loader ? (
        <Loader />
      ) : newspapers ? (
        newspapers.map((item, index) => (
          <NewsPaperCard key={index} {...item} forceUpdate={forceUpdate} />
        ))
      ) : (
        <h1>No newspapers</h1>
      )}
    </div>
  );
};

export default PdfSection;
