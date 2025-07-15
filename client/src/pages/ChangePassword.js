import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const changePassword = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_HOST}/auth/chngpwd`,
        { oldPwd: oldPass, newPwd: newPass }, //this is what goes to rout as req.body
        {
          headers: {
            accessToken: localStorage.getItem("personalAccessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
      });
  };

  return (
    <div>
      <h2>Change password</h2>
      <form>
        <input
          name="oldPassword"
          required
          type="text"
          placeholder="Old password"
          onChange={(event) => {
            setOldPass(event.target.value);
          }}
        />
        <input
          name="newPassword"
          required
          type="text"
          placeholder="New password"
          onChange={(event) => {
            setNewPass(event.target.value);
          }}
        />

        <input
          type="button"
          value="Save change"
          onClick={changePassword}
        />
      </form>
    </div>
  );
}

export default ChangePassword;
