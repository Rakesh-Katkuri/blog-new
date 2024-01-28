import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";
// import "./Navbar.css";

const Navbar = () => {
  const { posts, loggedIn } = useAuth();
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  //for search blogs
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase();

    const filteredPosts = posts.filter(
      (post) =>
        post.imageUrl.toLowerCase().includes(term) ||
        post.title.toLowerCase().includes(term) ||
        post.description.toLowerCase().includes(term)
    );
    navigate("/search-results", { state: { searchResults: filteredPosts } });
  };

  const handleLogout = () => {
    // Remove userId from localStorage
    localStorage.removeItem("userId");
    // Redirect to the login page
    navigate("/");
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return ( 
    <>
      <nav class="navbar navbar-expand-lg bg-black bg-opacity-50 custom-navbar">
        <div class="container-fluid py-3">
          <Link to="/" class=" navbar-brand" href="#">
            <h2>
              <strong className="custom-blogapp">PixelPoet</strong>
            </h2>
            </Link>
            {/* <div
            className="headertitles d-flex flex-column align-items-start"
          >
            <span
              className="headertitleSm position-absolute display-3"
            >
              PixelPoet
            </span>
            <span
              className="headertitleLg position-absolute display-6"
            >
              My Photography Blog
            </span>
          </div> */}
         

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              {/* <li class="nav-item">
                <Link
                  to="/"
                  // className="nav-link active"
                  className={
                    activeLink === "/" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => handleLinkClick("/")}
                  aria-current="page"
                >
                  All Blogs
                </Link>
              </li> */}
              {/* <li class="nav-item">
                <Link
                  to="/my-blogs"
                  className={
                    activeLink === "/my-blogs" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => handleLinkClick("/my-blogs")}
                  aria-current="page"
                >
                  My Blogs
                </Link>
              </li> */}
              {/* <li class="nav-item">
                <Link
                  to="/add-blog"
                  className={
                    activeLink === "/add-blog" ? "nav-link active" : "nav-link"
                  }
                  onClick={() => handleLinkClick("/add-blog")}
                >
                  Add Blog
                </Link>
              </li> */}

              {/* <li class="nav-item">
                <Link
                  to="/my-favorite/blogs"
                  className={
                    activeLink === "/my-favorite/blogs"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={() => handleLinkClick("/my-favorite/blogs")}
                >
                  My Favorites
                </Link>
              </li> */}
            </ul>

            <div class="form-group has-search d-flex ">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value) || setSearchActive(true)
                }
                class="form-control "
                placeholder="Search ..."
              />
              <button
                className="btn btn-primary bg-dark custom-search-icon"
                onClick={handleSearch} 
                disabled={!searchActive}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            <div className="d-flex">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle profile-icon"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user"></i>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end custome-profile"
                  aria-labelledby="profileDropdown"
                >
                  {userId ? (
                    <>
                      <li className="profileHover">
                        <Link
                          to="/add-blog"
                          className={
                            activeLink === "/add-blog"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={() => handleLinkClick("/add-blog")}
                        >
                          Add Blog
                        </Link>
                      </li>
                      <li className="profileHover">
                        <Link
                          to="/my-blogs"
                          className={
                            activeLink === "/my-blogs"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={() => handleLinkClick("/my-blogs")}
                          aria-current="page"
                        >
                          My Blogs
                        </Link>
                      </li>
                      <li className="profileHover">
                        <Link
                          to="/my-favorite/blogs"
                          className={
                            activeLink === "/my-favorite/blogs"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={() => handleLinkClick("/my-favorite/blogs")}
                        >
                          My Favorites
                        </Link>
                      </li>
                      <li className="profileHover">
                        <Link
                          to="/login"
                          className="nav-link active"
                          aria-current="page"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="profileHover">
                      <Link
                        to="/login"
                        className={
                          activeLink === "/login"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => handleLinkClick("/login")}
                      >
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;