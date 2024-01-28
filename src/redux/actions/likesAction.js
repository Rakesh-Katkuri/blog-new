import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateLikes = createAsyncThunk('posts/updatePost', async (updatedPost) =>{
    console.log("yug", updatedPost)
   const response = await axios.put(`http://localhost:3002/posts/${updatedPost.id}`, updatedPost)
   console.log("respones likes ", response)
   return response.data
    // .then((response) => {
    //     const updatedPostResponse = response.data;
    //     // const updatedPosts = posts.map((post) => 
    //     // post.id === updatedPostResponse.id ? updatedPostResponse : post
    //     // );
    //     return updatedPostResponse
    //     // setPosts(updatedPosts);
    //     // setPost(updatedPosts);
    // })
    // .catch((error)=>{
    //     console.log('error ', error)
    // });
})