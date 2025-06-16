import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function AddPost() {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Post should have a title"),
    postText: Yup.string().required(),
    username: Yup.string()
      .min(3)
      .max(16)
      .required("Name is required (min 3 and max 16 charters)"),
  });

  const onSubmit = (data) => {
    // console.log(data);
    axios.post("http://localhost:3001/posts", data).then((response) => {
      // console.log(response.data);
      console.log("post added");
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
          <label>Author:</label>
          <ErrorMessage
            name="username"
            component="span"
          />
          <Field
            id="inputAddPost"
            className="formInput"
            name="username"
            placeholder="John"
          />

          <button type="submit">Add Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddPost;
