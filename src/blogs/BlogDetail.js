import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../home/Header";
import "./style.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/posts/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <>
      <Header
        HeaderText="Full Insights Revealed"
        CaptionText="Get the full insights of this blog. Explore every detail that ass meaning to the content."
        textAlign="center"
        backgroundColor="#F5F5F3"
      />

      <div className="container mx-auto m-4">
        <div className="row custom-blogdetail-style">
          <div className="col-lg-6">
            <img
              src={blog.imageUrl}
              className="img-fluid rounded-0"
              alt="Blog Cover"
            />
          </div>
          <div className="col-lg-6">
            <div className="card rounded-0">
              <div className="card-header ">
                <div className="author-date-container d-flex align-items-center">
                  <div className="profile-circle rounded-circle d-flex justify-content-center align-items-center me-3">
                    {blog.author.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="author-date">
                    <div className="author">
                      {capitalizeFirstLetter(blog.author)}
                    </div>
                    <div className="date">{blog.date}</div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h4 className="blog-title mt-1 mb-4">
                  <strong>{capitalizeFirstLetter(blog.title)}</strong>
                </h4>
                <div
                  className="card-text"
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  {capitalizeFirstLetter(blog.description)
                    .split("\n")
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container d-flex justify-content-center align-items-center  m-5">
        <div className="card text-center w-75 rounded-0">
          <div className="card-header">
          <div className="author-date-container">
                    <div className="profile-circle rounded-circle d-flex justify-content-between align-items-center">
                      {blog.author.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="author-date">
                      <div className="author">{blog.author}</div>
                      <div className="date">{blog.date}</div>
                    </div>
                  </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <img
                src={blog.imageUrl}
                className="card-img-top img-fluid align-self-center rounded-0"
                alt="Blog Cover"
                style={{ height: "30rem" }}
              />
            </li>
            <li className="list-group-item">
            <h1 className="card-title text-center mb-auto">{blog.title}</h1>
              {blog.description.split("\n").map((paragraph, index) => (
                <p key={index} className="card-text mt-auto">
                  {paragraph}
                </p>
              ))}
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default BlogDetail;
