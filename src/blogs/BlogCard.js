import React from "react";

const BlogCard = ({
  blog,
  handleLike,
  handleFavorite,
  deletePost,
  // showButtons,
  handleCardClick,
}) => {
  const userId = localStorage.getItem("userId");

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
     }

  return (
    <div className="card rounded-0 custom-blogcard m-3">
      {/* Title */}
      <div className="card-header d-flex justify-content-between align-items-center">
      <div className="author-date-container d-flex align-items-center">
                    <div className="profile-circle rounded-circle d-flex justify-content-center align-items-center me-3">
                      {blog.author.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="author-date">
                      <div className="author">{capitalizeFirstLetter(blog.author)}</div>
                      <div className="date mb-2">{blog.date}</div>
                    </div>
                  </div>
      </div>

      {/* ImageUrl */}
      <div className="">
                  <img
                    src={blog.imageUrl}
                    className="card-img-top img-fluid rounded-0 mw-100 mh-100 blog-image"
                    alt="image blog"
                  />
                </div>

      {/* Like and Favorite Buttons */}
      <div className="row text-center custom-like-fav">
        <div className="col-sm-6">
          {blog.likes}
          <button
            className="custom-interaction-button"
            onClick={() => handleLike(blog.id)}
          >
            <i
              className={`fas fa-thumbs-up ${
                blog.likesBy && blog.likesBy.includes(userId)
                  ? "text-primary"
                  : ""
              }`}
            ></i>
          </button>
        </div>

        <div className="col-sm-6">
          <button
            className="custom-interaction-button"
            onClick={() => handleFavorite(blog.id)}
          >
            <i
              className={`fas fa-heart ${
                blog.favorites.includes(userId) ? "text-danger" : ""
              }`}
            ></i>
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="card-footer">
      <h1 className="blog-title">{capitalizeFirstLetter(blog.title)}</h1>
        <p className="blog-description">{capitalizeFirstLetter(blog.description)}</p>
      </div>
      <button
        type="button"
        class="btn btn-dark rounded-0 m-3 custom-readmore "
        onClick={() => handleCardClick(blog)}
      >
        Read More
      </button>
    </div>
  );
};

export default BlogCard;
