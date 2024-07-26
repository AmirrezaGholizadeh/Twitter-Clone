import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Main from "./components/main";
import NewPost from "./components/newPost";
import Profile from "./components/profile";
import EditPost from "./components/editpost";
import Posts from "./components/posts";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createpost" element={<NewPost />} />
        <Route path="/:id" element={<Profile />} />
        <Route path="/editpost/:post_id" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
