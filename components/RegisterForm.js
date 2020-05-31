import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Router from 'next/router'

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
  const classes = useStyles();
  return (
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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
</Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
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
                Gratis Aanmelden
</Button>
              <Grid container>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
        // <Form>
        //   <div className="form-group">
        //     <Field
        //       type="text"
        //       name="name"
        //       placeholder="Naam"
        //       className={`form-control ${
        //         touched.name && errors.name ? "is-invalid" : ""
        //         }`}
        //     />
        //     <ErrorMessage
        //       component="div"
        //       name="name"
        //       className="invalid-feedback"
        //     />
        //   </div>
        //   <div className="form-group">
        //     <Field
        //       type="bedrijfsNaam"
        //       name="companyName"
        //       placeholder="Bedrijfsnaam"
        //       className={`form-control ${
        //         touched.companyName && errors.companyName ? "is-invalid" : ""
        //         }`}
        //     />
        //     <ErrorMessage
        //       component="div"
        //       name="companyName"
        //       className="invalid-feedback"
        //     />
        //   </div>
        //   <div className="form-group">
        //     <Field
        //       type="email"
        //       name="email"
        //       placeholder="E-mailadres"
        //       className={`form-control ${
        //         touched.email && errors.email ? "is-invalid" : ""
        //         }`}
        //     />
        //     <ErrorMessage
        //       component="div"
        //       name="email"
        //       className="invalid-feedback"
        //     />
        //   </div>
        //   <div className="form-group">
        //     <Field
        //       type="password"
        //       name="password"
        //       placeholder="Wachtwoord"
        //       className={`form-control ${
        //         touched.password && errors.password ? "is-invalid" : ""
        //         }`}
        //     />
        //     <ErrorMessage
        //       component="div"
        //       name="password"
        //       className="invalid-feedback"
        //     />
        //   </div>
        //   <div className="form-group" >
        //     <Field as="select" name="referrer"
        //       className="form-control">
        //       <option disabled hidden>Hoe heb je ons gevonden?</option>
        //       <optgroup label="Aanbevolen door">
        //         <option defaultValue value="my_network">Mijn netwerk</option>
        //         <option value="my_advicer">Mijn adviseur</option>
        //         <option value="3">Relish</option>
        //       </optgroup>
        //       <optgroup label="Social Media">
        //         <option value="4">>Facebook</option>
        //         <option value="5">LinkedIn</option>
        //         <option value="6">Twitter</option>
        //         <option value="7">Instagram</option>
        //       </optgroup>
        //       <optgroup label="Overig">
        //         <option value="8">Gevonden via zoekopdracht</option>
        //         <option value="9">Kamer van Koophandel</option>
        //         <option value="10">Andere bron</option>
        //       </optgroup>
        //     </Field>
        //   </div>
        //   <button
        //     type="submit"
        //     className="btn btn-primary btn-block"
        //     disabled={isSubmitting}
        //   >
        //     {isSubmitting ? "Please wait..." : "Gratis Aanmelden"}
        //   </button>
        //   <div style={{ color: 'red' }}>{errors.general}</div>
        // </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;