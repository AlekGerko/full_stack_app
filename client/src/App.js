
import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      // console.log(response.data);
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        return (
          <div className='post'>
            <div className='title' data-key={value.id}>{value.title}</div>
            <div className='body' data-key={value.id}>{value.postText}</div>
            <div className='footer' data-key={value.id}>{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
