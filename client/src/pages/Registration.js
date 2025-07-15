import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(16)
      .required("Name is required (min 3 and max 16 charters)"),
    password: Yup.string()
      .min(3)
      .max(20)
      .required("(Password should be min 3 and max 20 symbols)"),
  });

  //data - from form
  const onSubmit = (data) => {
    // console.log(data);
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}/auth`, data)
      .then((response) => {
        // console.log(response.data);
        // console.log("user registered", response);
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
          <label>User Name:</label>
          <ErrorMessage
            name="username"
            component="span"
          />
          <Field
            autoComplete="off"
            className="formInput"
            name="username"
            placeholder="John"
          />

          <label>Password:</label>
          <ErrorMessage
            name="password"
            component="span"
          />
          <Field
            autoComplete="off"
            className="formInput"
            name="password"
            placeholder="***"
            type="password"
          />

          <button type="submit">Register User</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
