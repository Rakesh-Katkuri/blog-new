import React, { useEffect, useState } from "react";
import { useAuth } from "../authContext/AuthContext";
import BlogList from "./BlogList";
import Header from "../home/Header";

function MyBlog() {
  const { posts, getMyBlogs, deletePost, handleLike, handleFavorite } =
    useAuth();
  console.log("my blog post data", posts);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        await getMyBlogs();
      } catch (error) {
        console.error("error fetching blogs", error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleLikes = (blogId) => {
    handleLike(blogId);
  };
  const handleFavorites = (blogId) => {
    handleFavorite(blogId);
  };
  return (
    <>
    <div className="mt-0 custom-bg">
      <Header
        HeaderText="Explore Your Blogs"
        CaptionText="Discover the stories and moments you've shared. Your Blogs, Your Narrative"
        padding="6rem"
        textAlign="center"
        backgroundColor="#F5F5F3"
      />


      {posts.length > 0 ? (
        <BlogList
          blogs={posts}
          handleLike={handleLikes}
          handleFavorite={handleFavorites}
          deletePost={deletePost}
        />
      ) : (
        <p>no blogs</p>
      )}
      </div>
    </>
  );
}

export default MyBlog;
