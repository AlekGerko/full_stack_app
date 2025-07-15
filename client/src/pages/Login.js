import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const Login = () => {
    // console.log(username, password);
    const data = { username: username, password: password };
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}/auth/login`, data)
      .then((response) => {
        // console.log(response.data);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("personalAccessToken", response.data.token);
          // console.log(response.data);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate(`/`);
        }
      });
  };
  return (
    <div className="loginForm">
      <input
        type="text"
        placeholder="user name..."
        autoComplete="off"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="***"
        autoComplete="off"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={Login}>Login</button>
    </div>
  );
}

export default Login;
