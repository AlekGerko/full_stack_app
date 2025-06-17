import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Post from "./pages/Post";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="addpost">Add Post</Link>
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
