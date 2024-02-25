import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

 

  // SETTING UP THE FUNCTION TO HANDLE SIDEBAR ITEMS CLICK
  const handleSidebarNavitemClick = (e) => {
    e.preventDefault();
    const items = document.querySelectorAll(".sidebar-navItems");

    const activeBtn = e.target;
    items.forEach((current) => {
      if (current !== activeBtn) current.classList.remove("active");
      else current.classList.add("active");
    });
  };

  return (
    <header>
      <nav>
        <div className="navbar">
          <div className="logo" />

            <div className="bars" onClick={() => setOpenSidebar(true)}>
                <i className="fa-solid fa-bars" />
              </div>

        </div>

        <div className={`sidebar ${openSidebar ? "active" : "inactive"}`}>
          <div className="close-btn " id="sidebarCloseBtn">
            <i
              className="cross fa-solid fa-xmark"
              onClick={() => setOpenSidebar(false)}
            />
          </div>
          <ul className="navlist">
            <li
              className="navitems sidebar-navItems active"
              onClick={(e) => {
                navigate("/");
                setOpenSidebar(false);
                handleSidebarNavitemClick(e);
              }}
            >
              Home
            </li>
            <li
              className="navitems sidebar-navItems"
              onClick={(e) => {
                navigate("/search");
                setOpenSidebar(false);
                handleSidebarNavitemClick(e);
              }}
            >
              Search News
            </li>
            <li
              className="navitems sidebar-navItems"
              onClick={(e) => {
                navigate("/newspaper");
                setOpenSidebar(false);
                handleSidebarNavitemClick(e);
              }}
            >
              Newspaper
            </li>

            <li
              className="navitems sidebar-navItems"
              onClick={(e) => {
                navigate("/new");
                setOpenSidebar(false);
                handleSidebarNavitemClick(e);
              }}
            >
              Add News
            </li>
            <li
              className="navitems sidebar-navItems"
              onClick={(e) => {
                navigate("/new/newspaper");
                setOpenSidebar(false);
                handleSidebarNavitemClick(e);
              }}
            >
              Add Newspaper
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
