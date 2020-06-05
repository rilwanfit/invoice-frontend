import { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { InvoiceProvider } from '../components/InvoiceContext';
import InvoiceForm from '../components/Form/InvoiceForm';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    alignItemsAndJustifyContent: {
        width: 500,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function createInvoice() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <InvoiceProvider>
                <Grid container spacing={3}>
                    <Grid item>
                        <Typography variant="h6" color="textSecondary">Create a new Invoice</Typography>
                    </Grid>
                    <Grid item>
                        <Paper style={{ display: 'inline-block', width: '100%' }} justify="center" direction="column" >
                            <Grid container spacing={4} >
                                <Grid item xs={12} sm={6} md={12} >
                                    <Card className={classes.root} elevation={0}>
                                        <CardContent>
                                            <InvoiceForm />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </InvoiceProvider>
        </div>
    );
}