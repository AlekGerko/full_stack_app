
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddPost from './pages/AddPost';

function App() {

  return (
    <div className="App">
      <Router>
        <Link to="/" >Home</Link>
        <Link to="addpost" >Add Post</Link>
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/addpost' exact Component={AddPost} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
