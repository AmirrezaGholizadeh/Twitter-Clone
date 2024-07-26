import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check and set dark mode based on localStorage preference
  useEffect(() => {
    const darkModePreference = localStorage.getItem("dark-mode");
    if (darkModePreference === "enabled") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      if (response.data === "Data is wrong!") {
        throw new Error("Data is wrong");
      } else {
        // Store the response data in localStorage
        window.localStorage.setItem("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        window.localStorage.setItem("username", response.data.username);
        navigate("/");
      }
    } catch (error) {
      alert("Your username or password is not correct!");
    }
  };

  // Render the Login component 
  return (
    <div className="flex bg-white justify-center items-center h-screen font-poppins dark:bg-deepBlue">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-full md:h-1/2 p-2">
        <h1 className="text-2xl my-5 dark:text-white">Log in to MiniTwitter</h1>
        <form className="md:w-1/2" onSubmit={submit}>
          <div className="my-4 py-2">
            <label
              htmlFor="Username"
              className="block mb-2 text-left text-sm font-medium dark:text-white"
            >
              Enter your Username
            </label>
            <input
              id="Username"
              type="text"
              placeholder="Username"
              name="username"
              className="p-2 bg-gray-300 border border-gray-300 text-sm rounded-lg block w-full text-black"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="my-4 py-2">
            <label
              htmlFor="Password"
              className="block mb-2 text-sm text-left font-medium dark:text-white"
            >
              Enter your Password
            </label>
            <input
              id="Password"
              type="password"
              placeholder="Password"
              name="password"
              className="p-2 bg-gray-300 border border-gray-300 text-sm rounded-lg block w-full text-black"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-black text-white my-2 px-5 py-2 rounded-lg dark:bg-babyBlue dark:hover:bg-hoverBlue"
            >
              Log in
            </button>
            <a
              className="my-3 dark:text-white dark:hover:text-hoverBlue"
              href="/register"
            >
              Not a member? Sign up now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
