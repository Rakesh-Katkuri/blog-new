import React, { useEffect, useState } from "react";
import { useAuth } from "../authContext/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { toast } from "react-toastify";

const Navbar2 = () => {
  const { posts } = useAuth();
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  //for search blogs
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase();

    if (term.trim() === ""){
      // navigate("/")
      toast.warning("Please enter a search term before searching.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setSearchResults([]);
    }else{

      const filteredPosts = posts.filter(
        (post) =>
          // post.imageUrl.toLowerCase().includes(term) ||
          post.title.toLowerCase().includes(term) 
          // ||
          // post.description.toLowerCase().includes(term)
      );
      setSearchResults(filteredPosts);
      setSearchTerm("")
      navigate("/search-results", { state: { searchResults: filteredPosts } });
    }

   
  };

  const handleLogout = () => {
    // Remove userId from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    toast.dark("Logout successful.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    // Redirect to the login page
    navigate("/");
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const customStyle = {
    // backgroundColor: "#364037",
    // height: "8rem",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
  };
  const customLogo = {
    // color: "#F4DEC9",
    fontSize: "2rem",
  };
  const customLogin = {
    color: "#F4DEC9",
    fontSize: "1rem",
  };
  return (
    <header>
      <nav style={customStyle} class="navbar fixed-top navbar-expand-lg p-3 bg-white">
        <div class="container-fluid">
          <Link to="/" class=" navbar-brand">
            <h2>
              <strong style={customLogo} className="ms-2 text-black">
                PixelPoet
              </strong>
            </h2>
          </Link>
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
            <form class="d-flex mx-auto" role="search">
              <input
                class="form-control rounded-0 me-2"
                type="search"
                aria-label="Search"
                // type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value) || setSearchActive(true)
                }
              />
              <button class="btn btn-success rounded-0" type="submit"  onClick={handleSearch} 
                disabled={!searchActive}>
                Search
              </button>
            </form>
            <ul class="navbar-nav ml-auto  mb-2 mb-lg-0">
              {userId ? (
                <div className="container me-2">
                  <li class="nav-item dropdown-center ">
                    <i
                      className="fa-regular fa-id-badge text-black fs-3 nav-link text-end"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></i>
                    <ul class="dropdown-menu dropdown-menu-end ">
                      <li className="dropdown-item">
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
                      <li className="dropdown-item">
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
                      <li className="dropdown-item">
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
                      <li className="dropdown-item ">
                        <Link
                          to="/login"
                          className="nav-link active"
                          aria-current="page"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>
              ) : (
                <li className="profileHover ">
                  <Link
                    style={customLogin}
                    to="/login"
                    className="
                      btn border border-white rounded-0 custom-loginbtn"
                    //  activeLink === "/login" ? "nav-link active" : "nav-link"

                    onClick={() => handleLinkClick("/login")}
                  >
                    LOGIN
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar2;
