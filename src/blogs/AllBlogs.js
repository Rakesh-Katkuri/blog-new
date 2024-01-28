import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/AuthContext";
import "./style.css";
import BlogList from "./BlogList";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../home/Header";
import AutoCarousel from "../home/AutoCarousel";

//redux
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "../redux/reducer/likesSlice";
// import { updateLikes } from "../redux/actions/likesAction";

const AllBlogs = () => {
  //Accessing posts and update fun from ContexApi
  const { posts, getBlogs, updatePost, handleFavorite, handleLike } = useAuth();

  //Retrieving the userId from LocalStorage
  const userId = localStorage.getItem("userId");
  const location = useLocation(); // Get the current location

  // const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        await getBlogs();
      } catch (error) {
        console.error("error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, [location.pathname]);

  const handleLikes = (blogId) => {
    handleLike(blogId);
  };
  const handleFavorites = (blogId) => {
    handleFavorite(blogId);
  };

  //rendering all blog posts
  return (
    <>
      {/* <AutoCarousel /> */}

      <div className="mt-2 custom-bg pt-5">
        <Header
          HeaderText="Welcome to Our Blog"
          CaptionText="start your blog today and join a community of writers and readers who are passionate about sharing their stories and ideas."
          textAlign="center"
          backgroundColor="#34495E"
          color="white"
        />
        {posts.length > 0 ? (
          <BlogList
            blogs={posts}
            handleLike={handleLikes}
            handleFavorite={handleFavorites}
            deletePost={updatePost}
            showButtons={false}
          />
        ) : (
          <p>no blogs</p>
        )}
      </div>
    </>
  );
};

export default AllBlogs;
