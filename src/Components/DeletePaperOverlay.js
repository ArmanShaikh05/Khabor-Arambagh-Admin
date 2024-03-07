import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DeletePaperOverlay = ({ open, setOpen, title, forceUpdate, id }) => {
  const navigate = useNavigate();

  const handledelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER}/newspaper/delete/${id}`
      );
  
      if (response) {
        toast.success("Deleted Successfully");
        navigate("/newspaper");
        forceUpdate();
      }
    } catch (error) {
      console.log(error)
    }
  };

  if (open) {
    return (
      <div className="overlay-container">
        <div className="overlay-box">
          <div className="overlay-data">
            <h2>Are you sure you want to delete the NewsPaper?</h2>
            <h4>Title:- " {title}"</h4>
          </div>
          <div className="overlay-buttons">
            <button
              className="cancelBtn"
              type="button"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </button>
            <button className="deleteBtn" type="submit" onClick={handledelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default DeletePaperOverlay;
