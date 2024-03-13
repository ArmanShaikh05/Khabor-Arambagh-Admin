import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const PdfForm = () => {
  const [title, setTitle] = useState("");
  const [newspaper, setNewspaper] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/newspaper");
  };

  const createNewPost = async (e) => {
    e.preventDefault();

    if (title.length === 0) {
      toast.error("Title is Required");
    } else if (newspaper.length === 0) {
      toast.error("Please select a newspaper");
    } else {
      try {
        const data = new FormData();
        data.set("title", title);
        data.set("newspaper", newspaper[0]);

        const response = await axios.post(`${process.env.REACT_APP_SERVER}/newspaper/create`,data)

        if (response) {
          if(response.data.success === true){
            toast.success(response.data.message);
            navigate("/newspaper")
          }
          else{
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error)
      }
    }
  };

  return (
    <div className="newsform newspaper-container content-wrapper">
      <form onSubmit={(e) => createNewPost(e)}>
        <input
          type="text"
          placeholder={"Title"}
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          id="file"
          type="file"
          onChange={(e) => setNewspaper(e.target.files)}
          accept=".pdf"
        />

        <div className="editPostBtn-Container">
          <button
            className="cancelBtn"
            type="button"
            onClick={(e) => {
              handleNavigate(e);
            }}
          >
            Cancel
          </button>
          <button className={"createBtn"} type="submit">
            Create NewsPaper
          </button>
        </div>
      </form>
    </div>
  );
};

export default PdfForm;
