import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("personalAccessToken")) {
      navigate(`/login`);
    } else {
      axios
        .get(`${process.env.REACT_APP_BACKEND_HOST}/posts`, {
          headers: { accessToken: localStorage.getItem("personalAccessToken") },
        })
        .then((response) => {
          // console.log(response.data);
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const likeApost = (postId) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}/like`,
        { PostId: postId },
        {
          headers: { accessToken: localStorage.getItem("personalAccessToken") },
        }
      )
      .then((response) => {
        // alert(response.data);
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 1] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div
            key={key}
            data-key={value.id}
            className="post">
            <div
              className="title"
              data-key={value.id}>
              {value.title}
            </div>
            <div
              className="body"
              data-key={value.id}
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}>
              {value.postText}
            </div>
            <div
              className="footer"
              data-key={value.id}>
              <div className="postUser">
                <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              </div>
              <div className="postLikes">
                <FavoriteIcon
                  className={
                    likedPosts.includes(value.id)
                      ? "unlikeButton"
                      : "likeButton"
                  }
                  onClick={() => {
                    likeApost(value.id);
                  }}
                />
              </div>
              <span>{value.Likes.length}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
