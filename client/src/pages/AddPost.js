import React from "react";
import { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function AddPost() {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("personalAccessToken")) {
      navigate(`/login`);
    }
  }, []);

  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Post should have a title"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    // console.log(data);
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}/posts`, data, {
        headers: { accessToken: localStorage.getItem("personalAccessToken") },
      })
      .then((response) => {
        // console.log(response.data);
        console.log("post added");
        navigate(`/`);
      });
  };

  return (
    <div className="addPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        <Form>
          <label>Title:</label>
          <ErrorMessage
            name="title"
            component="span"
          />
          <Field
            id="inputAddPost"
            className="formInput"
            name="title"
            placeholder="Title"
          />
          <label>Post:</label>
          <ErrorMessage
            name="postText"
            component="span"
          />
          <Field
            id="inputAddPost"
            className="formInput"
            name="postText"
            placeholder="Text post..."
          />

          <button type="submit">Add Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddPost;
