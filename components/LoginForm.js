import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

import * as Yup from 'yup';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Router from 'next/router'

import { ApplicationContext } from './ApplicationContext'

const cookies = new Cookies();

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required")
});

const LoginForm = () => {

    const {
        login
    } = useContext(ApplicationContext)

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
                axios
                    .post(process.env.RESTURL + '/login_check', {
                        username: values.email,
                        password: values.password
                    })
                    .then(response => {
                        const { token } = response.data;
                        cookies.set('token', token);
                        login()
                        Router.push('/dashboard')
                    }).catch(error => {
                        console.log(error);

                        if (error.response.data.message) {
                            //this.error = error.response.data.error;
                            setFieldError('general', error.response.data.message);
                        } else {
                            setFieldError('general', 'Unknown error');
                        }
                    }).finally(() => {
                        setSubmitting(false);
                    });
            }}
        >
            {({ touched, errors, submitForm, isSubmitting }) => (
                <Form>
                    <Field
                        type="email"
                        name="email"
                        component={TextField}
                        InputProps={{ notched: true }}
                    />
                    <br />
                    <Field
                        type="password"
                        name="password"
                        component={TextField}
                        InputProps={{ notched: true }}
                    />
                    <br />
                    {isSubmitting && <LinearProgress />}
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                    >Submit</Button>
                    <div style={{ color: 'red' }}>{errors.general}</div>
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;