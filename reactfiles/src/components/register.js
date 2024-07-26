import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const redirect = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to handle dark mode preference from localStorage
  useEffect(() => {
    const darkModePreference = localStorage.getItem("dark-mode");
    if (darkModePreference === "enabled") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Function to handle form submission
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/register", {
        username: username.toLowerCase(),
        email,
        password,
        confirmPassword,
      });
      if (res.data === "Registered") {
        alert("You signed up successfully");
        redirect("/login");
      } else {
        throw new Error("Data is wrong");
      }
    } catch (error) {
      alert("You can't sign up!!!");
      console.error(error);
    }
  };

  return (
    <div className="flex bg-white justify-center items-center h-full font-poppins dark:bg-deepBlue">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-full md:h-1/2 p-2">
        <h1 className="text-2xl my-5 dark:text-white">
          Sign up to MiniTwitter
        </h1>
        <form className="w-4/5 md:w-3/5">
          <div className="my-3 py-2">
            <label
              htmlFor="Username"
              className="block mb-2 text-sm text-left font-medium dark:text-white"
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
            />
          </div>
          <div className="my-3 py-2">
            <label
              htmlFor="Email"
              className="block mb-2 text-sm text-left font-medium dark:text-white"
            >
              Enter your Email
            </label>
            <input
              id="Email"
              type="email"
              placeholder="Email"
              name="email"
              className="p-2 bg-gray-300 border border-gray-300 text-sm rounded-lg block w-full text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-3 py-2">
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
            />
          </div>
          <div className="my-3 py-2">
            <label
              htmlFor="ConfirmPassword"
              className="block mb-2 text-sm text-left font-medium dark:text-white"
            >
              Confirm your Password
            </label>
            <input
              id="ConfirmPassword"
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              className="p-2 bg-gray-300 border border-gray-300 text-sm rounded-lg block w-full text-black"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              onClick={submit}
              className="bg-black text-white my-2 px-5 py-2 rounded-lg w-full dark:bg-babyBlue dark:hover:bg-hoverBlue"
            >
              Sign up
            </button>
            <a
              className="my-3 dark:text-white dark:hover:text-hoverBlue"
              href="/login"
            >
              Already have an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
