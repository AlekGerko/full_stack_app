import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [listOfPostsForUser, setListOfPostsForUser] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/auth/userinfo/${id}`)
      .then((response) => {
        if (response.data) {
          setUserName(response.data.username);
        } else {
          window.location.assign("/");
        }
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/posts/byUserId/${id}`)
      .then((response) => {
        if (response.data) {
          setListOfPostsForUser(response.data);
        }
      });
  }, []);

  return (
    <div className="profileContainer">
      <div className="basicInfo">
        <h2>Username: {userName}</h2>
        {authState.username === userName && ( // let only profile's owner
          <button
            onClick={() => {
              navigate("/changepwd");
            }}>
            change my password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        <h4>Posts:</h4>
        <div>
          {listOfPostsForUser.map((value, key) => {
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
                  <div className="postUser">{value.username}</div>

                  <span>Likes: {value.Likes.length}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
