import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import Button from "@material-ui/core/Button";
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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

const RegisterShema = Yup.object().shape({
  name: Yup.string()
    .required("Naam is verplicht"),
  company: Yup.string()
    .required("Bedrijfsnaam is verplicht"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is verplicht"),
  password: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("Wachtwoord is verplicht")
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterForm = () => {

  const classes = useStyles();

  const {
    authenticated
  } = useContext(ApplicationContext)

  useEffect(() => {
    if (authenticated) {
      Router.push('/dashboard')
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {!authenticated && <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Create an account</Typography>
        <Formik
          initialValues={{ name: "", company: "", email: "", password: "" }}
          validationSchema={RegisterShema}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            axios
              .post(process.env.RESTURL + '/api/users', {
                username: values.email,
                password: values.password,
                lastname: values.name,
                company: {
                  name: values.company
                },
                referrer: values.referrer
              })
              .then(response => {
                Router.push('/registration-success')
              }).catch(error => {
                if (error.response !== undefined && error.response.data['hydra:description']) {
                  setFieldError('general', error.response.data['hydra:description'])
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
                id="name"
                label="Naam"
                name="name"
                autoComplete="name"
                autoFocus
                component={TextField}
              />
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="company"
                label="Bedrijfsnaam"
                name="company"
                autoComplete="company"
                autoFocus
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
              <FormControl fullWidth>
                <InputLabel variant="filled" htmlFor="referrer">Hoe heb je ons gevonden?</InputLabel>
                <Field
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="referrer"
                  name="referrer"
                  component={Select}
                >
                  <ListSubheader>Aanbevolen door</ListSubheader>
                  <MenuItem value={2}>Mijn netwerk</MenuItem>
                  <MenuItem value={4}>Mijn adviseur</MenuItem>
                  <MenuItem value={6}>Relish</MenuItem>
                  <ListSubheader>Social Media</ListSubheader>
                  <MenuItem value={8}>Facebook</MenuItem>
                  <MenuItem value={10}>LinkedIn</MenuItem>
                  <MenuItem value={12}>Twitter</MenuItem>
                  <MenuItem value={14}>Instagram</MenuItem>
                  <ListSubheader>Overig</ListSubheader>
                  <MenuItem value={16}>Gevonden via zoekopdracht</MenuItem>
                  <MenuItem value={18}>Kamer van Koophandel</MenuItem>
                  <MenuItem value={20}>Andere bron</MenuItem>
                </Field>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                className={classes.submit}
              >Gratis Aanmelden</Button>
              <div style={{ color: 'red' }}>{errors.general}</div>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    {"Already have an account? Login"}
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

export default RegisterForm;