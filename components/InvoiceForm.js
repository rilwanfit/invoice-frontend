import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Router from 'next/router'



class InvoiceForm extends React.Component  {
    
    render() {
        return (
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Login Form</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            // validationSchema={LoginSchema}
                            // onSubmit={(values, { setSubmitting, setFieldError }) => {
                            //     axios
                            //         .post(process.env.RESTURL + '/login_check', {
                            //             username: values.email,
                            //             password: values.password
                            //         })
                            //         .then(response => {
                            //             const { token } = response.data;
                            //             cookies.set('token', token);
                            //             Router.push('/profile')
                            //         }).catch(error => {
                            //             if (error.response.data.message) {
                            //                 //this.error = error.response.data.error;
                            //                 setFieldError('general', error.response.data.message);
                            //             } else {
                            //                 setFieldError('general', 'Unknown error');
                            //             }
                            //         }).finally(() => {
                            //             setSubmitting(false);
                            //         });
                            //}}
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
                                        {isSubmitting ? "Please wait..." : "Login"}
                                    </button>
                                    <div style={{ color: 'red' }}>{errors.general}</div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
};

export default InvoiceForm;