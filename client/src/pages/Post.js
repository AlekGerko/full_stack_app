import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();

  const [postObj, setPostObj] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewCommnet] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      // console.log(response.data);
      setPostObj(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      // console.log(response.data);
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        `http://localhost:3001/comments`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: sessionStorage.getItem("personalAccessToken"),
          },
        }
      )
      .then((response) => {
        // console.log("comment added");
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = { commentBody: newComment };
          setComments([...comments, commentToAdd]);
          setNewCommnet("");
        }
      });
  };

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
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment"
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewCommnet(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div
                key={key}
                className="comment">
                {comment.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
