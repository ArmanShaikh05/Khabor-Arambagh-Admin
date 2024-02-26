import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DeleteOverlay = ({ open, setOpen, title, forceUpdate, id }) => {
  const navigate = useNavigate();

  const handledelete = async () => {
    const response = await axios.delete(`${process.env.REACT_APP_SERVER}/delete/${id}`);

    if (response) {
      toast.success("Deleted Successfully");
      navigate("/");
      forceUpdate();
    }
  };

  if (open) {
    return (
      <div className="overlay-container">
        <div className="overlay-box">
          <div className="overlay-data">
            <h2>Are you sure you want to delete the News?</h2>
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

export default DeleteOverlay;
