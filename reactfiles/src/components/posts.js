import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Posts({ showButton, className, username, mainPage }) {
  const [postsData, setPostsData] = useState([]);
  const [localUsername, setLocalUsername] = useState("");  
  const redirect = useNavigate();
  const token = localStorage.getItem("access_token");

  // const token = localStorage.getItem("access_token");
  
  axios.defaults.withCredentials = true;
 
  useEffect(() => {
    try {
      // const token = localStorage.getItem("access_token");

      if (!token) throw new Error();

      const userData = jwtDecode(token);

      setLocalUsername(userData.username);
    } catch (error) {
      console.log(error);
      
    }
  }, []);

  // Fetch posts data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        setPostsData(res.data.post_data);
      })
      .catch((error) => {
        alert("You are not logged in to your account");
        redirect("/login");
      });
  }, []);

  // Function to handle post like
  const like = async (postID) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/like/${postID}`,
        { localUsername }
      );

      setPostsData((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postID
            ? {
                ...post,
                likes: post.likes + 1,
                likedBy: [...post.likedBy, localUsername],
              }
            : post
        )
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // Function to handle post dislike
  const dislike = async (postID) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/dislike/${postID}`,
        { localUsername }
      );

      setPostsData((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postID
            ? {
                ...post,
                likes: post.likes - 1,
                likedBy: post.likedBy.filter((user) => user !== localUsername),
              }
            : post
        )
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // Function to handle post deletion
  const deleteButton = async (postID) => {
    try {
      const response = await axios.delete(`http://localhost:8080/${postID}`);
      console.log(response.data.message);
      alert("Post deleted successfully");
      window.location.reload();
    } catch (error) {
      alert("Faild to delete the post");
    }
  };

  return (
    <div className={`mb-3 md:w-full ${className}`}>
      {postsData.map(
        (post) =>
          (post.Author === username || mainPage) && (
            <div
              className="bg-gray-400 mb-2 p-4 border-gray-600 shadow-inner rounded-lg dark:bg-slate-400"
              key={post._id}
            >
              {/* Post header with author and creation date */}
              <div className="flex justify-between">
                <a
                  href={`http://localhost:3000/${post.Author}`}
                  className="text-left text-xs hover:text-gray-800"
                >
                  {post.Author}
                </a>
                <p className="p-1 text-xs">{post.createdAt.split("T")[0]}</p>
              </div>

              {/* Post content */}
              <p className="text-left text-xl font-poppins">{post.Content}</p>

              {/* Post actions: like, dislike, delete, edit */}
              <div className="flex justify-between">
                {/* Post like and dislike*/}
                <div className="flex">
                  {post.likedBy.includes(localUsername) ? (
                    <button onClick={() => dislike(post._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 my-2 mr-1"
                      >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    </button>
                  ) : (
                    <button onClick={() => like(post._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </button>
                  )}

                  <h5 className="text-base my-2">{post.likes}</h5>
                </div>

                {/* Post delete and edit , visible only if the logged-in user is viewing their own profile */}
                <div>
                  {showButton && localUsername === username && (
                    <>
                      <button
                        className=""
                        onClick={() => deleteButton(post._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 my-2 mr-2 hover:fill-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                      <button onClick={() => redirect(`/editpost/${post._id}`)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 my-2 hover:fill-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default Posts;
