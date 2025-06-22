import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/addpost">Add Post</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
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
    </div>
  );
}

export default App;
