import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthStyle.css";
import axios from "axios";
import { validateForm } from "./FormValidator";
import { toast } from "react-toastify"; // Import the toast library
import "react-toastify/dist/ReactToastify.css"; // Import the default styles

const Login = () => {
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    //acces user data from localstorage and extract the first name
    const userDataString = localStorage.getItem("userData")
    const userData = userDataString ? JSON.parse(userDataString): null;
    if(userData && userData.firstName){
      setFirstName(userData.firstName);
    }
  },[])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log(e.target.value);

    setErrors((preErrors) => ({
      ...preErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = validateForm(user, "login");
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      try {
        const response = await axios.get("http://localhost:3002/user");
        console.log(response.data);
        const foundUser = response.data.filter(
          (item) => item.email === user.email && item.password === user.password
        );
        // localStorage.setItem("userId", foundUser[0].id);
        if (foundUser.length > 0) {
          localStorage.setItem("userId", foundUser[0].id); 
          localStorage.setItem("firstName", foundUser[0].firstName);
          localStorage.setItem("lastName", foundUser[0].lastName);
          setFirstName(foundUser.firstName)
          toast.success("Login successful. Welcome!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
          navigate("/", { replace: true });
        }
        console.log("login", foundUser);
      } catch (error) {
        // Show Toastify message when email and password do not match
        toast.error("Invalid email or password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        console.log("error in post request", error);
      }
    }
  };

  const emailRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (emailRef.current) {
        emailRef.current.focus();
      }
    }, 100);
  }, []);

  return (
    <>
      <div className="login template d-flex justify-content-center align-items-center m-3 custom-form ">
        <div className="form_container p-5  bg-white">
          <form>
            <div>
              <h2 className="text-center custome-btn-color mb-2">
                Welcome Back
              </h2>
              <p className="text-center custome-btn-color mb-4">
                Sign In to continue
              </p>
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                id="em"
                onChange={handleChangeInput}
                name="email"
                type="email"
                placeholder="Enter email"
                className="form-control rounded-0"
                ref={emailRef}
              />
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email}</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                id="pw"
                onChange={handleChangeInput}
                name="password"
                type="password"
                placeholder="Enter password"
                className="form-control rounded-0"
              />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </div>

            <div className="d-grid">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary btn-block rounded-0"
              >
                Sign In
              </button>
            </div>

            <p className="text-end mt-2">
              Don't Have Account
              <Link to="/signup" className="custom-sign ms-2">
                Sign Up
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
