import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useNavigate } from "react-router-dom";

const NewsForm = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [section, setSection] = useState("Local News");
  const navigate = useNavigate();

  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const deleteCategory = (e, i) => {
    e.preventDefault();
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let upperCat = cat.toUpperCase();
    let updatedCats = [...cats];
    updatedCats.push(upperCat);
    setCats(updatedCats);
    setCat("");
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const createNewPost = async (e) => {
    e.preventDefault();

    if (title.length === 0) {
      toast.error("Title is Required");
    } else if (summary.length === 0) {
      toast.error("Summary is Required");
    } else if (content.length === 0) {
      toast.error("Content is Required");
    } else {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("section", section);
      cats.forEach((cat) => {
        data.append("category[]", cat);
      });
      data.set("file", file[0]);


      try {
        // const response = await fetch(`${process.env.REACT_APP_SERVER}/create`, {
        //   method: "POST",
        //   body: data,
        // });

        const response = await axios.post(`${process.env.REACT_APP_SERVER}/create`,data,{
          headers:{
            "Content-Type": "multipart/form-data"
          }
        });
  
        if (response) {
          toast.success("Created Successfully");
          setRedirect(true);
        }
      } catch (error) {
        console.log(error)
      }
     
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="newsform content-wrapper">
      <form>
        <input
          type="text"
          placeholder={"Title"}
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder={"Summary"}
          value={summary}
          required
          onChange={(e) => setSummary(e.target.value)}
        />

        <input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files)}
          accept=".jpg, .png, .jpeg, .webp, .jfif, .avif"
        />

        <div className="category-label">
          <input
            type="text"
            id="categories"
            placeholder={"Add Categories"}
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          />
          <button
            type="button"
            onClick={addCategory}
            className="addCategoryBtn"
          >
            ADD
          </button>
        </div>

        <div className="categories-box">
          {cats?.map((item, index) => (
            <div key={index} className="categories">
              <p>{item}</p>
              <p
                key={index}
                type="button"
                onClick={(e) => {
                  deleteCategory(e, index);
                }}
                className="deleteCatBtn"
              >
                <i className="fa-solid fa-xmark deleteCatBtn"></i>
              </p>
            </div>
          ))}
        </div>

        <div className="select-area">
          <label>Select News Criteria</label>
          <select onChange={(e) => setSection(e.target.value)} value={section}>
            <option className="select-option">Local News</option>
            <option>National News</option>
            <option>World News</option>
          </select>
        </div>

        <ReactQuill
          className="textArea custom-scroolbar"
          modules={modules}
          formats={formats}
          required
          value={content}
          onChange={(newValue) => setContent(newValue)}
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
          <button className={"createBtn"} onClick={createNewPost} type="submit">
            Create News
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
