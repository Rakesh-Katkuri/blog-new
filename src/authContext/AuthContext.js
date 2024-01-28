import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Import the toast library
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [blogs, setBlogs] = useState([]); //getall
  const navigate = useNavigate();

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3002/posts");
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.log("error in post request", error);
    }
  };

  const getMyBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3002/posts");
      console.log(response.data);
      const userId = localStorage.getItem("userId");
      const myBlog = response.data.filter((item) => item.userId === userId);
      setPosts(myBlog);
    } catch (error) {
      console.log("error in post request", error);
    }
  };

  const createPost = async (posts) => {
    try {
      const response = await axios.post("http://localhost:3002/posts", posts);
      console.log(response.data);
    } catch (error) {
      console.log("error in post request", error);
    }
  };

  const updatePost = async (updatedPost) => {
    //rrree

    try {
      //fetch existing post data by id
      const response = await axios.get(
        `http://localhost:3002/posts/${updatedPost.id}`
      );
      const existingPost = response.data;
      let mergedPost;
      if (updatedPost.likesBy || updatedPost.favorites || updatedPost.likes) {
        //merge the updated data while retaining likes and favorites
        mergedPost = {
          id: updatedPost.id,
          imageUrl: updatedPost.imageUrl,
          title: updatedPost.title,
          description: updatedPost.description,
          likesBy: updatedPost.likesBy,
          userId: updatedPost.userId,

          likes: updatedPost.likes, //retain likes
          favorites: updatedPost.favorites, //retian favorites

          author: updatedPost.author,
          date: updatedPost.date,
        };
      } else {
        mergedPost = {
          id: updatedPost.id,
          imageUrl: updatedPost.imageUrl,
          title: updatedPost.title,
          description: updatedPost.description,
          likesBy: existingPost.likesBy,
          userId: updatedPost.userId,

          likes: existingPost.likes, //retain likes
          favorites: existingPost.favorites, //retian favorites

          author: existingPost.author,
          date: existingPost.date,
        };
        toast.success("Blog edited successfully !.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }

      console.log(mergedPost, "merged post data");
      //perform the update request to api endpoint
      const updatedPostResponse = await axios.put(
        `http://localhost:3002/posts/${updatedPost.id}`,
        mergedPost
      );

      //update the posts state with the updated post
      const updatedPosts = posts.map((post) =>
        post.id === updatedPostResponse.data.id
          ? updatedPostResponse.data
          : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.log("error ", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3002/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Blog deleted successfully !.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (error) {
      console.log("error deleting post", error);
    }
  };

  //LIKE AND FAVORITE BUTTONS
  //function to handle post likes
  const handleLike = async (blogId) => {
    console.log("handleLike function called");
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please log in to like the post!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return; // Do not proceed if the user is not logged in
    }

    try {
      const response = await axios.get(`http://localhost:3002/posts/${blogId}`);
      const post = response.data;

      const userId = localStorage.getItem("userId");
      const userLiked = post.likesBy.includes(userId);

      if (userLiked) {
        post.likes -= 1;
        post.likesBy = post.likesBy.filter((id) => id !== userId);
        toast.info("Post Unliked!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        post.likes += 1;
        post.likesBy.push(userId);
        toast.success("Post Liked!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      console.log(post, "all blogs likes");
      await updatePost(post);
      // dispatch(updateLikes(post))
    } catch (error) {
      console.log("error updating post", error);
    }
  };

  //user without login
  // const handleLike = (postId) => {
  //   try {
  //     // Retrieve posts data from local storage
  //     const postsData = JSON.parse(localStorage.getItem("posts")) || [];

  //     // Find the post by postId
  //     const postIndex = postsData.findIndex((post) => post.id === postId);
  //     if (postIndex !== -1) {
  //       // Check if the post has been liked by the current user
  //       const likedPost = postsData[postIndex];
  //       if (likedPost.likesBy.includes("anonymous")) {
  //         console.log("Post already liked by this user");
  //         return; // Do not allow liking again by the same user
  //       }

  //       // Update the likes count for the post
  //       likedPost.likes += 1;
  //       likedPost.likesBy.push("anonymous"); // Mark the post as liked by this user

  //       // Update the specific post in the posts data array
  //       postsData[postIndex] = likedPost;

  //       // Save the updated posts data back to local storage
  //       localStorage.setItem("posts", JSON.stringify(postsData));

  //       // Update the UI with the new likes count
  //       // You may need to refresh the posts or update the specific post in your state
  //     } else {
  //       console.error("Post not found");
  //     }
  //   } catch (error) {
  //     console.error("Error handling like:", error);
  //   }
  // };

  //favorites
  const handleFavorite = (blogId) => {
    const userId = localStorage.getItem("userId");
    const updatedPost = posts.find((blog) => blog.id === blogId);

    if (!userId) {
      toast.error("Please log in to add the post to favorites!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return; // Do not proceed if the user is not logged in
    }

    if (updatedPost && userId) {
      if (!updatedPost.favorites.includes(userId)) {
        updatedPost.favorites.push(userId);
        updatePost(updatedPost);
        toast.success("Added to Favorites!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        updatedPost.favorites = updatedPost.favorites.filter(
          (favUserId) => favUserId !== userId
        );
        updatePost(updatedPost);
        toast.warning("Removed from Favorites!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  // const logout = () => {
  //   setLoggedIn(false); // Corrected to setLoggedIn(false)
  //   localStorage.removeItem("userId");
  //   toast.dark("Logout successful. GoodBye!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //   });
  //   navigate("/");

  // };

  return (
    <>
      <AuthContext.Provider
        value={{
          // logout,
          loggedIn,
          getBlogs,
          posts,
          getMyBlogs,
          blogs,
          createPost,
          deletePost,
          updatePost,
          setPosts,
          handleFavorite,
          handleLike,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
