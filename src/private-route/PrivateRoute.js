import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = ({children}) => {
    const userId = localStorage.getItem("userId");
    const [toastShown, setToastShown] = useState(false);

    useEffect(()=>{
        if(!userId && !toastShown){
            toast.error("Authentication required. Please log in to access page.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true, 
                draggable: true,
              });
              setToastShown(true);
        }
    },[userId, toastShown])
  return userId ? children : <Navigate to="/login"/>
}

export default PrivateRoute