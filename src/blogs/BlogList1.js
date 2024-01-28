// This component used only in Myfavorite component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";

const BlogList = ({
  blogs,
  handleLike, 
  handleFavorite,
  deletePost,
  showButtons = true,
}) => {
  const itemsPerRow = 3;

  const navigate = useNavigate();

  const handleCardClick = (blog) => {
    navigate(`/blog/${blog.id}`);
  };

  const renderBlogs = () => {
    return (
      <div className="row custom-row">
        {blogs.map((blog) => (
          <div className={`col-md-${12 / itemsPerRow}`} key={blog.id}>
            <BlogCard
              blog={blog}
              handleLike={handleLike}
              handleFavorite={handleFavorite}
              showButtons={showButtons}
              deletePost={deletePost}
              handleCardClick={() => handleCardClick(blog)}
            />
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderBlogs()}</div>;
};

export default BlogList;
