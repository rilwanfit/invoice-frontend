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

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Wachtwoord is required")
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

const LoginForm = () => {

    const classes = useStyles();

    const {
        login,
        authenticated,
        hasCompanyDetails,
        setUsername
    } = useContext(ApplicationContext)

    useEffect(() => {
        if (authenticated) {
            if (hasCompanyDetails) {
                Router.push('/dashboard')
            }
            
            Router.push('/company-info')
        }
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {!authenticated && <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Inloggen</Typography>
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
                                axios
                                    .get(process.env.RESTURL + '/profile', {
                                        headers: {
                                            Authorization: 'Bearer ' + cookies.get('token')
                                        }
                                    })
                                    .then(response => {
                                        cookies.set('username', response.data.username)
                                        cookies.set('userid', response.data.userid)
                                        
                                        setUsername()

                                    }).catch(error => {
                                        console.log(error);

                                    }).finally(() => {
                                        if (!hasCompanyDetails) {
                                            Router.push('/company-info')
                                        } else {
                                            Router.push('/dashboard')
                                        }
                                    });

                            }).catch(error => {
                                if (error.response) {
                                    setFieldError('general', error.response.data.message);
                                } else {
                                    setFieldError('general', 'Unknown error');
                                }
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
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                component={TextField}
                            />
                            <Field
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Wachtwoord"
                                id="password"
                                autoComplete="current-password"
                                type="password"
                                name="password"
                                component={TextField}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                                className={classes.submit}
                            >Inloggen</Button>
                            <div style={{ color: 'red' }}>{errors.general}</div>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">Forgot password?</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
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

export default LoginForm;