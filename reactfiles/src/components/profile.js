import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Posts from "./posts";
import Navbar from "./navbar";
import { jwtDecode } from "jwt-decode";


function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [emptyPosts, setEmptyPosts] = useState(false);
  const [localUsername, setLocalUsername] = useState('');  

  useEffect(() => {
    try {
      const token = localStorage.getItem("access_token");

      if(!token)
        throw new Error()

      const userData = jwtDecode(token);

      setLocalUsername(userData.username);
    } catch (error) {
      console.log(error); 
    }
  }, [id])
  // const token = localStorage.getItem("access_token");

  // const userData = jwtDecode(token);

  // const localUsername = userData.username;


  // Fetch user posts when component mounts or ID changes
  useEffect(() => {
    axios
      .get(`http://localhost:8080/${id}`)
      .then((res) => {
        try{
          setUserPosts(res.data.userPosts);

          // Set emptyPosts to true if there are no posts
          if (res.data.userPosts === 0) {
            setEmptyPosts(true);
          }
        } catch (error) {
          throw new Error()
        }

      })
      .catch((error) => {
        console.log(error);
        alert("Cannot get data");
      });
  }, [id]);



  // Function to handle user logout
  const logOutButton = async () => {
    try {
      // Remove the access token from cookies
      const response = await axios.post("http://localhost:8080/logout");

      // Clear all localStorage items
      // localStorage.removeItem("username")
      localStorage.removeItem("access_token");
      // localStorage.removeItem("userID");
      // Redirect to login page
      alert("Logged out successfully");
      navigate("/login");
    } catch (error) {
      alert("Try Again to Log out!");
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="grid grid-rows-10 grid-cols-3 md:relative md:flex md:w-full min-h-screen font-poppins dark:bg-deepBlue">
      {/* Navbar section */}
      <div className="row-start-1 md:w-1/5">
        <Navbar />
      </div>

      {/* Main content section */}
      <div className="relative mx-auto row-start-2 col-span-3 md:flex-col md:w-3/5 md:mx-0 h-full">
        <div className="text-2xl row-start-1 mb-8 md:mt-2 font-poppins dark:text-white">
          {`${id}`}'s Posts
        </div>

        {/* Check if there are no posts */}
        {emptyPosts ? (
          <div className="text-2xl mt-20 dark:text-white">No User or Posts available.</div>
        ) : (
          <Posts
            showButton={true}
            className="md:flex md:flex-col md:w-4/5"
            username={id}
            mainPage={false}
          />
        )}
      </div>

      {/* Log out button, visible only if the logged-in user is viewing their own profile */}
      {localUsername === id ? (
        <div className="relative col-start-3 md:ml-5 md:w-1/5">
          <button
            className="ml-10 bg-black text-white h-8 m-2 w-20 rounded-lg hover:bg-gray-800 dark:bg-babyBlue dark:hover:bg-hoverBlue"
            onClick={logOutButton}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Profile;
