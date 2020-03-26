import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterForm = () => {
  return (
    <Formik 
      initialValues={{ firstName: '', lastName: '', email: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    > 
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" className="form-input" placeholder="Jane" />
          <ErrorMessage name="firstName" />
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" />
          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;