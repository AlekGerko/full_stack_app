import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [postObj, setPostObj] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewCommnet] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/posts/byId/${id}`)
      .then((response) => {
        // console.log(response.data);
        setPostObj(response.data);
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/comments/${id}`)
      .then((response) => {
        // console.log(response.data);
        setComments(response.data);
      });
  }, []);

  const addComment = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}/comments`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("personalAccessToken"),
          },
        }
      )
      .then((response) => {
        // console.log("comment added");
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            c_username: response.data.c_username,
          };
          setComments([...comments, commentToAdd]);
          setNewCommnet("");
          // window.location.reload(); //need to reload page to be able to see actual comments and delete if needed
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_HOST}/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("personalAccessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            // 'val' - spisok vsih komentariv
            return val.id !== id; // lushayu v spisku komentariv tilki ti, yaki ne != id tih, scho vidalyaemo
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_HOST}/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("personalAccessToken") },
      })
      .then(() => {
        navigate(`/`);
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter new title");
      axios
        .put(
          `${process.env.REACT_APP_BACKEND_HOST}/posts/title`,
          { newTitle: newTitle, id: id },
          {
            headers: {
              accessToken: localStorage.getItem("personalAccessToken"),
            },
          }
        )
        .then(() => {
          setPostObj({ ...postObj, title: newTitle });
        });
    } else {
      let newPostText = prompt("Enter new text");
      axios
        .put(
          `${process.env.REACT_APP_BACKEND_HOST}/posts/posttext`,
          { newText: newPostText, id: id },
          {
            headers: {
              accessToken: localStorage.getItem("personalAccessToken"),
            },
          }
        )
        .then(() => {
          setPostObj({ ...postObj, postText: newPostText });
        });
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div
          className="singlePost"
          id="individual">
          <div
            className="singlePostTitle"
            onClick={() => {
              if (authState.username === postObj.username) {
                editPost("title");
              }
            }}>
            {postObj.title}
          </div>
          <div
            className="singlePostBody"
            onClick={() => {
              if (authState.username === postObj.username) {
                editPost("body");
              }
            }}>
            {postObj.postText}
          </div>
          <div className="singlePostFooter">{postObj.username}</div>
        </div>

        {authState.username === postObj.username && ( // let only author delete post
          <button
            onClick={() => {
              deletePost(postObj.id);
            }}>
            delete this post
          </button>
        )}
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
                <div className="commentUsername">{comment.c_username}</div>
                {authState.username === comment.c_username && ( // let only author delete comment
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}>
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
