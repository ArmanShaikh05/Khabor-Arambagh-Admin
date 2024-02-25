import { format } from "date-fns";
import React, { useState } from "react";
import DeletePaperOverlay from "./DeletePaperOverlay";

const NewsPaperCard = ({ index, title, createdAt, _id, forceUpdate }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <DeletePaperOverlay
        open={showOverlay}
        setOpen={setShowOverlay}
        title={title}
        forceUpdate={forceUpdate}
        id={_id}
      />
      <div key={index} className="newspaper-card">
        <div className="newspaper-details">
          <i className="fa-solid fa-file fa-2x"></i>
          <div className="newspaper-titles">
            <h3 className="newspaper-title">{title}</h3>
            <h5 className="newspaper-title">
              {createdAt ? format(createdAt, "d MMM, yyyy h:mm aaaa") : "N/A"}
            </h5>
          </div>
        </div>

        <button
          type="submit"
          onClick={() => setShowOverlay(true)}
        >
          <i
            className="fa-solid fa-trash  newspaper-deleteBtn"
            id="deleteNewsBtn"
          />
        </button>
      </div>
    </>
  );
};

export default NewsPaperCard;
