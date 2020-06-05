import React, { useContext, useState, Fragment, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form, ErrorMessage, FieldArray, useField, useFormikContext } from "formik";
import { TextField, Select } from 'formik-material-ui';
import * as Yup from 'yup';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from "@material-ui/core/LinearProgress";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import DateFnsUtils from '@date-io/date-fns';

import { InvoiceContext } from './InvoiceContext';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const validateSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "name must be 3 characters at minimum")
        .required("name is required"),
    street_name: Yup.string()
        .min(3, "street_name must be 3 characters at minimum")
        .required("street_name is required"),
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    postCode: Yup.string()
        .min(6, 'Voer een geldige postcode in')
        .max(6, 'Voer een geldige postcode in')
        .required("Voer je postcode in"),
    city: Yup.string()
        .required(' voer uw volledige adres in')

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
            initialValues={{ name: "", street_name: "", email: "", postCode: "", city: "" }}
            validationSchema={validateSchema}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
                // axios
                //     .post(process.env.RESTURL + '/api/invoices', {
                //         invoiceNumber: invoice_data.invoice_number,
                //         customer: {
                //             name: customer.name,
                //             street_name: customer.street_name,
                //             postal_address: customer.postal_address,
                //             email: customer.email
                //         },
                //         product: products,
                //         notes: invoice_data.notes
                //     }, {
                //         headers: {
                //             Authorization: 'Bearer ' + cookies.get('token')
                //         }
                //     })
                //     .then(response => {
                //         console.log(response);
                //     }).catch(error => {
                //         if (error.response.data['hydra:description']) {
                //             setErrorMessage(error.response.data['hydra:description'])
                //             handleClick()
                //         } else {
                //             setErrorMessage('Unknown error')
                //         }
                //     }).finally(() => {
                //         setSubmitting(false);
                //     });
            }}
        >
            {({ values, errors, touched, submitForm, handleChange, setFieldValue }) => (
                <Form>
                    {/* <Grid container spacing={6}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                
                                <Field
                                    type="text"
                                    name='name'
                                    label="Naam ontvanger"
                                    placeholder='name'
                                    component={TextField}
                                />
                            </Grid>
                        </Grid>
                        
                        <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            onClick={submitForm}
                        >Submit</Button>
                        
                        {isSubmitting && <LinearProgress />} */}
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Field
                                type="text"
                                name='company'
                                label="Bedrijfsnaam"
                                placeholder='name'
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
                                autoComplete="firstName"
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
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                label="Use this address for payment details"
                            />
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default CustomerForm