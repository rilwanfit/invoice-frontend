import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LinearProgress from "@material-ui/core/LinearProgress";

import * as Yup from 'yup';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Router from 'next/router'

import { ApplicationContext } from './ApplicationContext'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const cookies = new Cookies();

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required")
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(30),
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
                // <Form>

                //     <br />
                //     
                //     <br />
                //     {isSubmitting && <LinearProgress />}
                //     <Button
                //         variant="contained"
                //         color="primary"
                //         disabled={isSubmitting}
                //         onClick={submitForm}
                //     >Submit</Button>
                //     <div style={{ color: 'red' }}>{errors.general}</div>
                // </Form>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Inloggen</Typography>
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
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                component={TextField}
                                autoComplete="current-password"
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
                                className={classes.submit}
                            >
                                Sign In
          </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/forgot-password" variant="body2">
                                        Forgot password?
              </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
            )}
        </Formik>
    );
}

export default LoginForm;