import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const apiUrl = 'https://localhost:8000/register'

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required")
});

const Register = ({ _username, _password }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _username, _password }, null, 2),
          mode: 'cors'
        })
          .then((response) => {
            if (response.ok) {
              // const { token } = response.json()
              // login({ token })
            } else {
              reject(new Error('Registration failed.'));
            }
          })
      } catch (error) {
        reject(new Error('You have an error in your code or there are Network issues.'));
      }
      resolve(true);
    }, 1000);
  });

const RegisterForm = () => {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <h1 className="mt-5">Register Form</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={RegisterSchema}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              Register({ _username: values.email, _password: values.password })
                .then((response) => {
                  // const { token } = response;
                  // login({ token })
                })
                .catch(error => {
                  setFieldError('general', error.message);
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className={`form-control ${
                      touched.email && errors.email ? "is-invalid" : ""
                      }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className={`form-control ${
                      touched.password && errors.password ? "is-invalid" : ""
                      }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="invalid-feedback"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Please wait..." : "Submit"}
                </button>
                <div style={{ color: 'red' }}>{errors.general}</div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;