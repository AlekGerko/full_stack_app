import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/validuser", {
        headers: { accessToken: localStorage.getItem("personalAccessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/addpost">Add Post</Link>
            {!authState && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            )}
          </div>

          <Routes>
            <Route
              path="/"
              exact
              Component={Home}
            />
            <Route
              path="/addpost"
              exact
              Component={AddPost}
            />
            <Route
              path="/post/:id"
              exact
              Component={Post}
            />
            <Route
              path="/login"
              exact
              Component={Login}
            />
            <Route
              path="/registration"
              exact
              Component={Registration}
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
