import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();

  const [postObj, setPostObj] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      // console.log(response.data);
      setPostObj(response.data);
    });
  }, []);

  return (
    <div className="postPage">
      <div className="leftSide">
        <div
          className="singlePost"
          id="individual">
          <div className="singlePostTitle">{postObj.title}</div>
          <div className="singlePostBody">{postObj.postText}</div>
          <div className="singlePostFooter">{postObj.username}</div>
        </div>
      </div>
      <div className="rightSide">Comments here</div>
    </div>
  );
}

export default Post;
