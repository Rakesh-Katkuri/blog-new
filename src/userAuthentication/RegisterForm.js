import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateForm } from "./FormValidator";
import "./AuthStyle.css";

const Register = () => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const currentErrors = validateForm(user, "register");
    setErrors(currentErrors);
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    if (Object.keys(currentErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3002/user", data);
        console.log(response.data);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("lastName", user.lastName);
        navigate("/");
      } catch (error) {
        console.log("error in post request", error);
      }
    } else {
      console.log("error");
    }
  };

  const fnameRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (fnameRef.current) {
        fnameRef.current.focus();
      }
    }, 100);
  }, []);

  const errorValidation = {
    color: "red",
    fontSize: "1rem",
  };

  return (
    <>
      <div className="signup template d-flex justify-content-center align-items-center custom-reg-form">
        <div className="form_container p-5 bg-white">
          <form>
            <div>
              <h2 className="text-center custome-btn-color mb-4">
                Create Account
              </h2>
            </div>
            <div className="d-flex align-items-center">
              <div className="mb-2 me-1">
                <label htmlFor="firstName">First Name</label>
                <input
                  onChange={handleChangeInput}
                  ref={fnameRef}
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="form-control rounded-0"
                />
                {errors.firstName && (
                  <span style={errorValidation}>{errors.firstName}</span>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  onChange={handleChangeInput}
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className="form-control rounded-0"
                />
                {errors.lastName && (
                  <span style={errorValidation}>{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChangeInput}
                name="email"
                type="email"
                placeholder="Enter email"
                className="form-control rounded-0"
              />
              {errors.email && (
                <span style={errorValidation}>{errors.email}</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChangeInput}
                name="password"
                type="password"
                placeholder="Enter password"
                className="form-control rounded-0"
              />
              {errors.password && (
                <span style={errorValidation}>{errors.password}</span>
              )}
            </div>

            <div className="d-grid">
              <button
                type="submit"
                onClick={handleSignup}
                className="btn btn-primary btn-block rounded-0"
              >
                Sign Up
              </button>
            </div>

            <p className="text-end mt-2">
              Already Registered
              <Link to="/login" className="ms-2 custom-sign">
                Sign In
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
