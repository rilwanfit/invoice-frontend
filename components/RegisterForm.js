import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Router from 'next/router'

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is verplicht"),
  companyName: Yup.string().required("Bedrijfsnaam is verplicht"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is verplicht"),
  name: Yup.string()
    .required("Naam is verplicht")
});

const RegisterForm = () => {
  return (

    <div className="col-lg-12">
      <Formik
        initialValues={{ name: "", companyName: "", email: "", referrer: "my_network", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          axios
            .post(process.env.RESTURL + '/api/users', {
              "lastname": values.name,
              "company": {
                "name": values.companyName
              },
              "username": values.email,
              "password": values.password,
              "referrer": values.referrer,
            })
            .then(response => {
               Router.push('/registration-success')
            }).catch(error => {
              if (error.response.data['hydra:description']) {
                setFieldError('general', error.response.data['hydra:description']);
              } else {
                setFieldError('general', 'Unknown error');
              }
            }).finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Field
                type="text"
                name="name"
                placeholder="Naam"
                className={`form-control ${
                  touched.name && errors.name ? "is-invalid" : ""
                  }`}
              />
              <ErrorMessage
                component="div"
                name="name"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <Field
                type="bedrijfsNaam"
                name="companyName"
                placeholder="Bedrijfsnaam"
                className={`form-control ${
                  touched.companyName && errors.companyName ? "is-invalid" : ""
                  }`}
              />
              <ErrorMessage
                component="div"
                name="companyName"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <Field
                type="email"
                name="email"
                placeholder="E-mailadres"
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
              <Field
                type="password"
                name="password"
                placeholder="Wachtwoord"
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
            <div className="form-group" >
              <Field as="select" name="referrer"
                className="form-control">
                <option disabled hidden>Hoe heb je ons gevonden?</option>
                <optgroup label="Aanbevolen door">
                  <option defaultValue value="my_network">Mijn netwerk</option>
                  <option value="my_advicer">Mijn adviseur</option>
                  <option value="3">Relish</option>
                </optgroup>
                <optgroup label="Social Media">
                  <option value="4">>Facebook</option>
                  <option value="5">LinkedIn</option>
                  <option value="6">Twitter</option>
                  <option value="7">Instagram</option>
                </optgroup>
                <optgroup label="Overig">
                  <option value="8">Gevonden via zoekopdracht</option>
                  <option value="9">Kamer van Koophandel</option>
                  <option value="10">Andere bron</option>
                </optgroup>
              </Field>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Gratis Aanmelden"}
            </button>
            <div style={{ color: 'red' }}>{errors.general}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;