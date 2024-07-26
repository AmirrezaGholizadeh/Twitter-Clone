import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Posts from "./posts";
import Navbar from "./navbar";

function MainPage() {
  const [content, setContent] = useState("");
  const [searchField, setSearchField] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (!token) {
      setIsLoggedIn(false);
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [navigate]);

  // Handle new post submission
  const onSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      await axios.post("http://localhost:8080/newpost", {
        content: content,
        author: window.localStorage.getItem("username"),
      });
      alert("Post created successfully");
      window.location.reload();
    } catch {
      alert("Creating post unsuccessful! Try again");
    }
  };

  // Handle search submission
  const searchSubmit = async () => {
    try {
      navigate(`/${searchField}`);
    } catch {
      alert("Error while searching");
    }
  };

  // Display a message if the user is not logged in and redirecting
  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-deepBlue">
        <p className="text-xl dark:text-white">
          You are not logged in. Redirecting to login page...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 md:grid-cols-10 md:h-full min-h-screen w-full bg-white font-poppins dark:bg-deepBlue">
      {/* Navbar section */}
      <div className="col-span-2 md:col-start-1 md:row-start-1">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="relative justify-center col-start-1 mx-auto col-span-4 md:mx-0 md:row-start-1 md:justify-start md:col-start-2 md:col-span-6">
        {/* Post creation area */}
        <div className="flex bg-gray-300 mb-3 mt-20 md:mt-0 md:w-full dark:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 m-2 dark:text-babyBlue"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>

          <textarea
            placeholder="Write what's on your mind"
            className="w-full resize-none h-20 bg-gray-300 mb-2 p-2"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>

          <button
            className="bg-black text-white h-8 m-2 w-20 rounded-lg hover:bg-gray-800 dark:bg-babyBlue dark:hover:bg-hoverBlue"
            onClick={onSubmit}
          >
            Post
          </button>
        </div>

        {/* Display posts */}
        <Posts showButton={false} mainPage={true} username={""} />
      </div>

      {/* Search area */}
      <div className="relative row-start-1 col-end-5 col-span-2 mr-4 md:mr-8 md:ml-4 md:col-start-8 md:col-span-3">
        <div className="absolute flex mt-2.5 ml-0 md:mt-4 md:ml-2 ps-1 md:ps-1 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        <input
          id="Search"
          type="text"
          placeholder="Search"
          name="search"
          className="w-full p-4 pl-4 md:p-5 md:pl-8 m-1 md:m-2 ps-20 bg-gray-300 border border-gray-300 text-sm md:text-lg rounded-lg h-4 md:h-4 text-black"
          onChange={(e) => setSearchField(e.target.value)}
          value={searchField}
        />

        <button
          onClick={searchSubmit}
          className="absolute end-0.5 top-1.5 md:end-0 md:top-2.5 bg-black text-white text-sm md:text-md rounded-lg w-14 h-7 p-1 md:p md:w-15 md:h-9 hover:bg-gray-800 dark:bg-babyBlue dark:hover:bg-hoverBlue"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default MainPage;
