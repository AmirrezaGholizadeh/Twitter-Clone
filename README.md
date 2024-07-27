# Mini Twitter Clone

## Overview

This is a mini Twitter clone built using the MERN stack (MongoDB, Express, React, Node.js), Tailwind CSS for styling, and JWT (JSON Web Token) for authentication. This project demonstrates a full-stack web application with a RESTful API, secure authentication, and a responsive, modern UI.

## Features

- **User Authentication**: Secure login and signup using JWT.
- **Tweet Functionality**: Create, read, update, and delete tweets.
- **Like System**: Like and unlike tweets.
- **Responsive Design**: Fully responsive UI using Tailwind CSS.
- **User Profiles**: View user profiles and their tweets.
- **Feed**: View tweets from other users.

## Technologies Used

- **Frontend**:
  - React
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express

- **Database**:
  - MongoDB

- **Authentication**:
  - JWT (JSON Web Token)

## Installation

Follow these steps to get a local copy up and running:

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Clone the Repository

```sh
git clone https://github.com/AmirrezaGholizadeh/Twitter-Clone.git
cd mini-twitter-clone
```

### Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the backend directory with the following environment variables:
    ```env
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

4. Start the frontend server:
    ```sh
    npm start
    ```

### Running the Application

- The backend server should be running on [http://localhost:8080](http://localhost:8080)
- The frontend server should be running on [http://localhost:3000](http://localhost:3000)

## Usage

1. Open your browser and go to [http://localhost:3000](http://localhost:3000).
2. Sign up for a new account or log in with an existing account.
3. Start tweeting, following users, and liking tweets!

## Project Structure

```sh
mini-twitter-clone/
├── backend/                # Backend source files
│   ├── controllers/        # Controllers for handling requests
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── middleware/         # Middleware for authentication
│   ├── utils/              # Utility functions
│   └── server.js           # Entry point for the backend
├── frontend/               # Frontend source files
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # React pages
│   │   ├── services/       # Services for API calls
│   │   ├── contexts/       # Contexts for global state
│   │   └── App.js          # Entry point for the frontend
└── README.md               # Project README file
```

## Acknowledgements

- [MERN Stack](https://www.mongodb.com/mern-stack)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Web Tokens](https://jwt.io/)

---

