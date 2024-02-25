import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [section, setSection] = useState("");

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
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (cat === "") return;
    let upperCat = cat.toUpperCase();
    let updatedCats = [...cats];
    updatedCats.push(upperCat);
    setCats(updatedCats);
    setCat("");
  };

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${process.env.SERVER}/edit/${id}`)
      .then((response) => {
        response.json().then((NewsInfo) => {
          setTitle(NewsInfo.title);
          setSummary(NewsInfo.summary);
          setContent(NewsInfo.content);
          setFile(NewsInfo.file);
          setCats(NewsInfo.category);
          setSection(NewsInfo.section);
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  const updatdePost = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("section", section);
    cats.forEach((cat) => {
      data.append("category[]", cat);
    });

    if (file?.[0]) {
      data.set("file", file?.[0]);
    }

    const response = await fetch(`${process.env.SERVER}/update/${id}`, {
      method: "PUT",
      body: data,
    });

    if (response.ok) {
      setRedirect(true);
      toast.success("Updated Successfully");
    }
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/");
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="newsform content-wrapper">
      <form className="form" onSubmit={updatdePost}>
        <input
          type="text"
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder={"Summary"}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <input type="file" onChange={(e) => setFile(e.target.files)} />

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
          className="textArea"
          modules={modules}
          formats={formats}
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
          <button className="createBtn" type="submit">
            Update News
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
