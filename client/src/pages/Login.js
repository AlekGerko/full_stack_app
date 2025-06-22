import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Login = () => {
    // console.log(username, password);
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response);
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
