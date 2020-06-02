import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Router from 'next/router'
import { ApplicationContext } from '../components/ApplicationContext'
import CompanyInfoForm from '../components/CompanyInfoForm'

const useStyles = makeStyles((theme) => ({
    paper: {
    },
}));

export default function CompanyInfo() {
    const classes = useStyles();

    const {
        authenticated
    } = useContext(ApplicationContext)

    useEffect(() => {
        if (!authenticated) {
            Router.push('/')
        }
    });

    return (
        <Grid container>
            <Grid item xs={12} m="auto" className={classes.alignItemsAndJustifyContent}>
                <Paper className={classes.paper}>
                    <CompanyInfoForm />
                </Paper>
            </Grid>
        </Grid>
    );
}