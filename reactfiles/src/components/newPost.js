import axios from "axios";
import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

function NewPost() {
  const redirect = useNavigate()

  const [content, setContent] = useState();



  const onSubmit = async (e) => {
   
    try {
        await axios.post("http://localhost:8080/newpost", {
          content: content,
          author: window.localStorage.getItem("username")
        });
        alert("Post created successfully")
        redirect("/")
        }catch {
            alert("Creating post unsuccessfully! Try again")
        }
    };
    
  return (
    <div>

      <label for="content">Content</label>
      <textarea id="content" placeholder="Text" onChange={e => setContent(e.target.value)}></textarea>

      <button type="submit" onClick={onSubmit}>Create Post</button>
    </div>
  );
}

export default NewPost;
