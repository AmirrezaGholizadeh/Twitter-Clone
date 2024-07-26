import React, { useEffect, useState } from "react";
import { redirect, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const navigate = useNavigate();
  const { post_id } = useParams();
  const [postData, setPostData] = useState([]);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");

  // Fetch the post data when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:8080/editpost/${post_id}`)
      .then((res) => {
        const data = res.data.postData;
        setPostData(data);
        setTextAreaContent(data.Content);
        setOriginalContent(data.Content);
      })
      .catch((error) => {
        console.error(error);
        alert("Cannot get data");
      });
  }, [post_id]);

  // Submit the updated content
  const submit = async (username) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/editpost/${post_id}`,
        {
          textAreaContent,
        }
      );
      if (response.data.message === "Successful") {
        navigate(`/${username}`);
      } else {
        throw new Error("Unsuccessful!");
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  // Render the component
  return (
    <div>

      {postData.map((post) => {
        return (
          <div className="flex bg-white justify-center items-center h-screen font-poppins dark:bg-deepBlue">
            <div
              key={post._id}
              className="flex flex-col items-center justify-center w-4/5 md:w-1/2 rounded-lg p-2 bg-gray-400 dark:bg-slate-400"
            >
              <textarea
                id="content"
                name="content"
                className="p-2 bg-gray-400 border border-gray-400 text-md rounded-lg block w-full text-black resize-none focus:outline-none dark:bg-slate-400"
                onChange={(e) => {
                  setTextAreaContent(e.target.value);
                }}
              >
                {post.Content}
              </textarea>

              <button
                type="submit"
                onClick={(e) => {
                  if (
                    textAreaContent !== originalContent &&
                    textAreaContent !== ""
                  ) {
                    submit(post.Author);
                  } else {
                    e.preventDefault();
                  }
                }}
                className={`my-2 px-2 py-2 rounded-lg self-end ${
                  textAreaContent !== originalContent && textAreaContent !== ""
                    ? "bg-black text-white cursor-pointer hover:bg-gray-800 dark:bg-babyBlue dark:hover:bg-hoverBlue"
                    : "bg-gray-700 text-gray-200 cursor-not-allowed dark:bg-gray-300"
                }`}
                disabled={textAreaContent === originalContent}
              >
                Save Changes
              </button>
              
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EditPost;
