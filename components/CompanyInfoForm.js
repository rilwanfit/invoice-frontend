import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as Yup from 'yup';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Router from 'next/router'

import { ApplicationContext } from './ApplicationContext'

const cookies = new Cookies();

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const vSchema = Yup.object().shape({
    company_name: Yup.string()
        .required("Company name is required"),
    street_name: Yup.string()
        .required("Street name is required"),
    kvk_number: Yup.string()
        .required("kvk nummber is required"),
    vat_number: Yup.string()
        .required("Company name is required"),
    bank_accont_number: Yup.string()
        .required("Company name is required"),
    email: Yup.string()
        .required("Company name is required"),
    phone: Yup.string()
        .required("Company name is required"),
});

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const companyDetails = { company_id: "", company_name: "", street_name: "", kvk_number: "", vat_number: "", bank_accont_number: "", email: "", phone: "" }

const CompanyInfoForm = () => {

    const classes = useStyles();

    const {
        login,
        authenticated,
        hasCompanyDetails,
        userid,
        token
    } = useContext(ApplicationContext)

    useEffect(() => {
        if (!authenticated) {
            Router.push('/')
        }

        axios
            .get(process.env.RESTURL + '/api/users/' + cookies.get('userid'), {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => {

                const results = response.data.company

                companyDetails.company_name = results.name
                companyDetails.street_name = results.id
                companyDetails.kvkNumber = results.kvkNumber
                companyDetails.vatNumber = results.vatNumber
                companyDetails.iban = results.iban
                companyDetails.email = results.email
                companyDetails.phone = results.phone

            }).catch(error => {
                console.log(error);

            }).finally(() => {
            });
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {authenticated && <div className={classes.paper}>
                <Typography component="h1" variant="h5">Your company details</Typography>
                <Formik
                    initialValues={companyDetails}
                    validationSchema={vSchema}
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                        axios
                            .patch(process.env.RESTURL + '/api/companies/' + companyDetails.company_id, {
                                address: values.street_name,
                                kvkNumber: values.kvk_number,
                                vatNumber: values.vat_number,
                                iban: values.iban,
                                email: values.email,
                                phone: values.phone
                            },{
                                headers: {
                                    Authorization: 'Bearer ' + token,
                                    'Content-Type': 'application/merge-patch+json'
                                }
                            })
                            .then(response => {
                                console.log(response)
                                Router.push('/create-invoice')
                            }).catch(error => {
                                console.error(error);
                                
                            }).finally(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    {({ errors, submitForm, isSubmitting }) => (
                        <Form className={classes.form} noValidate>
                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="company_name"
                                label="Company name"
                                name="company_name"
                                autoComplete="company_name"
                                component={TextField}
                            />

                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="street_name"
                                label="Straat"
                                name="street_name"
                                autoComplete="street_name"
                                autoFocus
                                component={TextField}
                            />

                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="kvk_number"
                                label="KVK nummer"
                                name="kvk_number"
                                autoComplete="kvk_number"
                                component={TextField}
                            />

                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="vat_number"
                                label="BTW-nummer"
                                name="vat_number"
                                autoComplete="vat_number"
                                component={TextField}
                            />

                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="bank_accont_number"
                                label="IBAN"
                                name="bank_accont_number"
                                autoComplete="bank_accont_number"
                                component={TextField}
                            />

                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                component={TextField}
                            />


                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Phone nummer"
                                name="phone"
                                autoComplete="phone"
                                component={TextField}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                                className={classes.submit}
                            >Save</Button>
                            <div style={{ color: 'red' }}>{errors.general}</div>
                        </Form>
                    )}
                </Formik>
            </div>}
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default CompanyInfoForm;