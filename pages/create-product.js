import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar';
import Link from '@material-ui/core/Link';
import MuiAlert from '@material-ui/lab/Alert';

import Router from 'next/router'
import { ApplicationContext } from '../components/ApplicationContext'
import CompanyInfoForm from '../components/CompanyInfoForm'

const useStyles = makeStyles((theme) => ({
    paper: {
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CreateProduct() {
    const classes = useStyles();

    const {
        authenticated
    } = useContext(ApplicationContext)

    useEffect(() => {
        if (!authenticated) {
            Router.push('/')
        }
    });

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Grid container>
            <Grid item xs={12} m="auto" className={classes.alignItemsAndJustifyContent}>
                <Paper className={classes.paper}>
                    <CompanyInfoForm handleClick={handleClick} />
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">Successfully updated, you want to <Link href="/create-invoice">create invoice</Link>?</Alert>
                </Snackbar>
            </Grid>
        </Grid>
    );
}