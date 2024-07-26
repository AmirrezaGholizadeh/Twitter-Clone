const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const mainPage = require("./routes/mainPage");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const createPostRoute = require("./routes/createPost");
const deletePostRoute = require("./routes/deletePost");
const searchUserRoute = require("./routes/searchUser");
const findPostByIDRoute = require("./routes/findPostByID");
const editPostRoute = require("./routes/editPost");
const likePostRoute = require("./routes/likePost");
const dislikePostRoute = require("./routes/dislikePost");
const logoutRoute = require("./routes/logout");
const jwtAuth = require("./routes/jwtAuthentication");

const users = require("./database/users");
const posts = require("./database/posts");

app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/views")));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// Home route with JWT authentication
app.get("/", jwtAuth, mainPage);

// Route to render register page
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Route to handle user registration
app.post("/register", registerRoute);

// Route to render login page
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Route to handle user login
app.post("/login", loginRoute);

// Route to render new post page
app.get("/newpost", (req, res) => {
  res.render("new_post.ejs");
});

// Route to handle creation of a new post
app.post("/newpost", createPostRoute);

// Route to handle deletion of a post by ID
app.delete("/:id", deletePostRoute);

// Route to search for a user by ID
app.get("/:id", searchUserRoute);

// Route to render edit post page by post ID
app.get("/editpost/:id", findPostByIDRoute);

// Route to handle editing of a post by ID
app.put("/editpost/:id", editPostRoute);

// Route to handle liking a post by ID
app.post("/like/:id", likePostRoute);

// Route to handle disliking a post by ID
app.post("/dislike/:id", dislikePostRoute);

// Route to handle user logout
app.post("/logout", logoutRoute);

// Connect to MongoDB and start the server
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(8080, () => {
      console.log("Listening on port 8080...");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
