import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import * as Yup from 'yup';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Router from 'next/router'

import { ApplicationContext } from '../ApplicationContext'

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
        .required("Bedrijfsnaam mag niet leeg zijn"),
    street_name: Yup.string()
        .required("Straat mag niet leeg zijn"),
    kvk_number: Yup.number()
        .required("kvk nummer mag niet leeg zijn")
        .min(8, 'Voer een volledige kvk nummer in'),
    vat_number: Yup.number()
        .required("Company name is required")
        .min(14,"Voer een geldige btw-nummer in"),
    bank_accont_number: Yup.string()
        .required("Company name is required")
        .min(18,"Voer een geldige rekenningnummer in")
        .max(34,"Voer een geldige rekenningnummer in"),
    email: Yup.string()
        .required("E-mail mag niet leeg zijn")
        .email("Voer een geldige e-mailadres in"),
    phone: Yup.string()
        .required("Telefoon mag niet leeg zijn")
        .min(10,"Voer een geldige  telefonnummer in")
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

const CompanyInfoForm = (props) => {

    const classes = useStyles();
    const {
        authenticated,
        userid,
        token
    } = useContext(ApplicationContext)

    useEffect(() => {
        if (!authenticated) {
            Router.push('/')
        }

        axios
            .get(process.env.RESTURL + '/api/users/' + userid, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => {

                const results = response.data.company
                companyDetails.company_id = results.id
                companyDetails.company_name = results.name
                companyDetails.street_name = results.address
                companyDetails.kvk_number = results.kvkNumber
                companyDetails.vat_number = results.vatNumber
                companyDetails.bank_accont_number = results.iban
                companyDetails.email = results.email
                companyDetails.phone = results.phone

            }).catch(error => {
                console.error(error);
            });
    }, []);

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
                                if (response.status === 200) {
                                    props.handleClick()
                                }
                                
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
                                label="Bedrijfsnaam"
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
                                component={TextField}
                            />
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