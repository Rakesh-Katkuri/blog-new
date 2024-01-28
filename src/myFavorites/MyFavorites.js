import React from "react";
import { useAuth } from "../authContext/AuthContext";
import BlogList from "../blogs/BlogList1";
import Header from "../home/Header";

const MyFavorites = () => {
  const { posts, handleLike, handleFavorite, deletePost } = useAuth();

  const userId = localStorage.getItem("userId");

  const userFavorites = posts.filter((post) => post.favorites.includes(userId));

  return (
    <div className="custom-bg">
      <Header
        HeaderText="Your Favorite Picks"
        CaptionText="Explore your curated collection of favorite blogs. Each one holds a special place in your reading journey."
        textAlign="center"
        backgroundColor="#F5F5F3"
      />
      {userFavorites.length > 0 ? (
        // Using BlogList from BlogList1 component to display userFavorites
        <BlogList
          blogs={userFavorites}
          handleLike={handleLike}
          handleFavorite={handleFavorite}
          deletePost={deletePost}
        />
      ) : (
        <div className="text-center bg-secondary">
          <h1>No Favorite Blogs yet!</h1>
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
