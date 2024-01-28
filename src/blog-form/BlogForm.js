import React from "react";
import "./BlogForm.css";

const BlogForm = ({ postData, onChange, onSubmit, buttonText, author }) => {
  const isSubmitDisabled = !(
    // postData.author &&
    (postData.imageUrl && postData.title && postData.description)
  );
  return (
    <form>
      {/* <h2 className='text-center mb-4'>Post Your Blog</h2> */}

      <div className="mb-2">
        <label htmlFor="author">Author</label>
        <input
          value={author}
          readOnly
          name="author"
          type="text"
          className="form-control rounded-0"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="imageUrl">ImageURL</label>
        <input
          onChange={onChange}
          value={postData.imageUrl}
          name="imageUrl"
          type="text"
          className="form-control rounded-0"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="title">Title</label>
        <input
          onChange={onChange}
          value={postData.title}
          name="title"
          type="text"
          className="form-control rounded-0"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="description">Description</label>
        <textarea
          onChange={onChange}
          value={postData.description}
          name="description"
          id="exampleFormControlTextArea1"
          rows="3"
          className="form-control rounded-0"
        />
      </div>

      <input type="hidden" value={postData.date} name="date" />

      <div className="d-grid custom-btn">
        <button
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className="btn btn-block  rounded-0"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
