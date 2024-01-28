import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../home/Header";
import BlogCard from "../blogs/BlogCard";
import "./SearchBlog.css";

const SearchedBlogs = ({
  blog,
  handleLike,
  handleFavorite,
  deletePost,
  showButtons = true,
}) => {
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };

  const navigate = useNavigate();

  const handleCardClick = (blog) => {
    navigate(`/blog/${blog.id}`);
  };

  const customStyle = {
    backgroundColor: "#F5F5F3",
  };

  return (
    <div>
      <Header
        HeaderText="Search Results"
        // CaptionText="At PixelPoet, Create your blog, share your Ideas, and become a part of our writing community. Your creativity our platform"
        textAlign="center"
        backgroundColor="#F5F5F3"
      />
      <div
        className="container d-flex justify-content-center align-items-center w-50"
        style={customStyle}
      >
        <div className="row custom-row">
          {searchResults.length > 0 ? (
            searchResults.map((post) => (
              <div className="col-md-12 mt-3" key={post.id}>
                <BlogCard
                  blog={post}
                  handleLike={handleLike}
                  handleFavorite={handleFavorite}
                  showButtons={showButtons}
                  deletePost={deletePost}
                  handleCardClick={() => handleCardClick(post)}
                />
              </div>
            ))
          ) : (
            <div className="text-center bg-secondary">
              <h4>NO SEARCH RESULTS FOUND</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchedBlogs;
