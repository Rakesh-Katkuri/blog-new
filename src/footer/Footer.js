import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Footer.css";
import axios from "axios";

const Footer = () => {
  const [activeLink, setActiveLink] = useState("");
  const [email, setEmail] = useState("");
  // const [subscribedEmails , setSubscribedEmails] = useState([]);
  const location = useLocation();
  // const userId = localStorage.getItem("userId")

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  // const handleSubscribe = async () =>{
  //   if(!userId){
  //     console.error("user not loggedin. unale to subscribe")
  //     return;
  //   };

  //     //checks if email is alredy suscribed
  //     if(subscribedEmails.some(entry => entry.email === email)){
  //       alert("email already subscribed")
  //       return
  //     }

  //   await axios.post("http://localhost:3002/subscribedEmails", {userId, email})
  //   .then((response)=>{
  //     if(response.status === 200){
  //       setSubscribedEmails([...subscribedEmails, {userId, email}])
  //       console.log("sub successfull")
  //     }else{
  //       console.error("sub fail")
  //     }
  //   })
  //   .catch((error)=>{
  //     console.error("error during subcr", error)
  //   })
  // }
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <footer
        style={{ backgroundColor: "#1D5356" }}
        class="text-white text-center text-lg-start"
      >
        <div class="container p-4">
          <div class="row">
            <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h2 class="text">PixelPoet</h2>

              <p>My Photography Blog</p>
              <p>Crafting stories in every frame</p>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0 custom">
              <ul class="list-unstyled mb-0">
                <li class="nav-item">
                  <Link
                    to="/"
                    className="item"
                    onClick={() => handleLinkClick("/")}
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>

                <li class="nav-item">
                  <Link
                    to="/add-blog"
                    className="item"
                    onClick={() => handleLinkClick("/add-blog")}
                    aria-current="page"
                  >
                    Add Blog
                  </Link>
                </li>

                <li class="nav-item">
                  <Link
                    to="/my-blogs"
                    className="item"
                    onClick={() => handleLinkClick("/my-blogs")}
                    aria-current="page"
                  >
                    My Blogs
                  </Link>
                </li>
              </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              {/* <h5 class="text mb-0">Join My Mailing List</h5> */}

              <ul class="list-unstyled">
                {/* <label className="mt-2">Email*</label>
                <input
                  class="form-control rounded-0 mb-2"
                  type="text"
                  placeholder="Enter your email here"
                  aria-label=".form-control-lg example"
                  // value={email}
                  // onChange={(e)=> setEmail(e.target.value)}
                /> */}
                <button
                  type="button"
                  class="btn btn-dark rounded-0 mt-3 custom-button"
                  // onClick={handleSubscribe}
                >
                  Enable Notification
                </button>
              </ul>
            </div>
          </div>
        </div>

        <div class="text-center p-3" style={{ backgroundColor: "#364037" }}>
          © 2024 Copyright:
          <a class="text-white" href="">
            PixelPoet.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
