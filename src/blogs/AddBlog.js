import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";
import Header from "../home/Header";
import "./style.css";
import BlogForm from "../blog-form/BlogForm";
import { toast } from "react-toastify";

const AddBlog = () => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const [posts, setPosts] = useState({
    likes: 0,
    likesBy: [],
    favorites: [],
    date: getCurrentDate(),
  });
  const [author, setAthor] = useState("");
  const { createPost, getMyBlogs } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    if(firstName && lastName){
      setAthor(`${firstName} ${lastName}`);
    }
  },[])

  const handleChangeInput = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    posts.userId = userId;
    posts.author = author;
    createPost(posts);
    getMyBlogs();
    toast.success("Blog added successfully !.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    navigate("/");
  };

  return (
    <>
    <div className="custom-bg">
      <Header
        HeaderText="Create Your Blog Here"
        CaptionText="At PixelPoet, Create your blog, share your Ideas, and become a part of our writing community. Your creativity our platform"
        padding="6rem"
        textAlign="center"
        backgroundColor="#F5F5F3"
      />

      <div className="addblog template d-flex justify-content-center align-items-center vh-100 ">
        <div className="form_container p-5 w-50 rounded-0 bg-white">
          <BlogForm
            postData={posts}
            onChange={handleChangeInput}
            onSubmit={handlePost}
            buttonText="Add Post"
            author = {author}
          />
        </div>
      </div>
      </div>
    </>
  );
};

export default AddBlog;
