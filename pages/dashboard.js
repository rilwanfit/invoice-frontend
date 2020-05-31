import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Router from 'next/router'
import { ApplicationContext } from '../components/ApplicationContext'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Dashboard() {
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
        <>
            {authenticated && <Grid container sm={12} spacing={3}>
                <Grid item sm={6}>
                    <Paper className={classes.paper}>
                        Right panel
        </Paper>
                </Grid>
                <Grid item sm={6}>
                    <Paper className={classes.paper}>
                        Dashboard
        </Paper>
                </Grid>
            </Grid>}
        </>
    );
}