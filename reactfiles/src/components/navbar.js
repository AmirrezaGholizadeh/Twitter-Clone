import React, { useState, useEffect } from "react";

function Navbar() {
  const username = window.localStorage.getItem("username");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check and apply the dark mode preference from localStorage on initial render
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

  // Toggle dark mode and update the localStorage preference
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-mode", "disabled");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-mode", "enabled");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex md:fixed md:flex-col md:w-full">
      {/* Home icon linking to the home page */}
      <a href="http://localhost:3000/">
        <svg
          className="h-9 w-9 md:h-10 md:w-10 m-1 md:m-3 dark:text-babyBlue fill-current"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      </a>

      {/* Profile icon linking to the user's profile page */}
      <a href={`http://localhost:3000/${username}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 md:w-7 md:h-7 m-1.5 md:m-3 dark:text-gray-300 dark:fill-current dark:hover:text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </a>

      {/* Dark mode toggle icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6 md:w-7 md:h-7 m-1.5 md:m-3 dark:text-gray-300 dark:fill-current cursor-pointer dark:hover:text-gray-400"
        onClick={toggleDarkMode}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>
    </div>
  );
}

export default Navbar;
