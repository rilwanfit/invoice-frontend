import React, { useContext, useState, Fragment, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form, ErrorMessage, FieldArray, useField, useFormikContext } from "formik";
import { TextField, Select } from 'formik-material-ui';
import * as Yup from 'yup';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { InvoiceContext } from '../InvoiceContext';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

export const validateSchema = Yup.object().shape({
    company: Yup.string()
        .required("Bedrijfsnaam mag niet leeg zijn"),
    firstName: Yup.string()
        .min(3, "name must be 3 characters at minimum")
        .required("Voornaam is required"),
    lastName: Yup.string()
        .min(3, "name must be 3 characters at minimum")
        .required("Achternaam is required"),
    address: Yup.string()
        .min(3, "address must be 3 characters at minimum")
        .required("address is required"),
    postCode: Yup.string()
        .required("Voer je postcode in"),
    city: Yup.string()
        .required('Voer uw volledige adres in'),
    country: Yup.string()
        .required('country required')
});

const useStyles = makeStyles((theme) => ({
    root: {

    },
    mediaQuery: theme.breakpoints.down('sm')
}));

const CustomerForm = (props) => {
    const classes = useStyles();
    return (
        <Formik
            initialValues={{ company: "", firstName: "", lastName: "", address: "", postCode: "", city: "", country: "" }}
            validationSchema={validateSchema}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
                if (props.updateCustomer != undefined) {
                    props.updateCustomer({
                        company: values.company,
                        address: values.address,
                        postCode: values.postCode,
                        city: values.city,
                        country: values.country,
                    })
                }
                axios
                    .post(process.env.RESTURL + '/api/customers', {
                        'companyName': values.company,
                        'firstName': values.firstName,
                        'lastName': values.lastName,
                        'address': values.address,
                        'postcode': values.postCode,
                        'city': values.city,
                        'country': values.country
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + cookies.get('token')
                        }
                    })
                    .then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.error(error);
                        // if (error.response.data['hydra:description']) {
                        //     setErrorMessage(error.response.data['hydra:description'])
                        //     handleClick()
                        // } else {
                        //     setErrorMessage('Unknown error')
                        // }
                    }).finally(() => {
                        setSubmitting(false);
                        props.handleClose()
                    });
            }}
        >
            {({ errors, submitForm, isSubmitting }) => (
                <Form>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Field
                                type="text"
                                name='company'
                                label="Bedrijfsnaam"
                                component={TextField}
                                fullWidth
                                autoComplete="company"
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                type="text"
                                name='firstName'
                                label="Voornaam"
                                placeholder='name'
                                component={TextField}
                                fullWidth
                                autoComplete="firstName"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                type="text"
                                name='lastName'
                                label="Achternaam"
                                placeholder='name'
                                component={TextField}
                                fullWidth
                                fullWidth
                                autoComplete="lastName"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                type="text"
                                name='address'
                                label="Adres"
                                placeholder='name'
                                component={TextField}
                                fullWidth
                                fullWidth
                                autoComplete="shipping address-line"
                            />

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field
                                type="text"
                                name='postCode'
                                label="Post code"
                                placeholder='name'
                                component={TextField}
                                fullWidth
                                autoComplete="postCode"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                type="text"
                                name='city'
                                label="Plaat"
                                placeholder='name'
                                component={TextField}
                                fullWidth
                                autoComplete="lastName"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                type="text"
                                name='country'
                                label="country"
                                placeholder='name'
                                component={TextField}
                                fullWidth
                                fullWidth
                                autoComplete="country"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider light />
                            {isSubmitting && <LinearProgress />}
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={submitForm}
                                disabled={isSubmitting}
                            >Add Customer</Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default CustomerForm