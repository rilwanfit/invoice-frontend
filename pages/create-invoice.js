import { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CustomerInfo from '../components/InvoiceForm/CustomerInfo';
import CompanyInfo from '../components/InvoiceForm/CompanyInfo';
import ProductForm from '../components/InvoiceForm/ProductForm';
import { InvoiceProvider } from '../components/InvoiceContext';

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
                <Paper >
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={6}>
                            <Card className={classes.root} elevation={0}>
                                <CardContent>
                                    <CustomerInfo />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Card className={classes.root} elevation={0}>
                                <CardContent>
                                    <CompanyInfo />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={12}>
                            <Card className={classes.root} elevation={0}>
                                <CardContent>
                                    <ProductForm />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </InvoiceProvider>
        </div>
    );
}