import React, { useState } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

import DeleteOverlay from "./DeleteOverlay";


const News = ({ title, summary, image, createdAt, _id, forceUpdate }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      <DeleteOverlay
        open={showOverlay}
        setOpen={setShowOverlay}
        title={title}
        forceUpdate={forceUpdate}
        id={_id}
      />
      <div className="newsCard">
        <h3 className="newsTitle">{title}</h3>
        <img
          src={`${process.env.REACT_APP_SERVER
}/${image}`}
          className="newsImage"
          alt=""
        />
        <p className="newsDescription">{summary}</p>
        <div className="newsDetails">
          <p className="newsCreatedAt">
            {format(createdAt, "d MMM, yyyy h:mm aaaa")}
          </p>
          <div className="newsCardOptions">
            <button
              className="deleteNewsBtn"
              type="submit"
              onClick={() => setShowOverlay(true)}
            >
              <i
                className="fa-solid fa-trash newsOptionsIcon deleteNewsBtn"
                id="deleteNewsBtn"
              />
            </button>

            <Link to={`/edit/${_id}`}>
              <i
                className="fa-solid fa-pen newsOptionsIcon editNewsBtn"
                id="editNewsBtn"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
