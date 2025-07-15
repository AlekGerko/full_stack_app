import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/auth/validuser`, {
        headers: { accessToken: localStorage.getItem("personalAccessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("personalAccessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.assign("/");
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="nav">
            <div className="account_area">
              {authState.status ? ( // ' !authState && ' - if there is no other option to show
                <>
                  <Link to="/">Home</Link>
                  <Link to="/addpost">Add Post</Link>
                  <button
                    className="logout_button"
                    onClick={logout}>
                    Logout
                  </button>
                  <h2>{authState.username}</h2>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/registration">Registration</Link>
                </>
              )}
            </div>
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
            <Route
              path="/profile/:id"
              exact
              Component={Profile}
            />
            <Route
              path="/changepwd"
              exact
              Component={ChangePassword}
            />

            <Route
              path="*"
              exact
              Component={PageNotFound}
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
