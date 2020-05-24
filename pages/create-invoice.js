import { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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
    const [isDataRequired, setIsDataRequired] = useState(false)

    const onSubmit = () => {
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
    }

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
                                    {/* Thank you note */}
                                    <Typography variant="h5" component="h2">
                                        Wij verzoeken u vriendelijk om het openstaand bedrag van xxxx (retrieve from total at the bottom)
                                        voor xx-xx-xxxx (retrieve from vervaldatum) over te maken op onze rekeningnummer onder
                                        vermelding van het factuurnummer ‘xxxxx (retrieve from #factuurnummer)’.
                                        Voor vragen kunt u contact opnemen per e-mail of telefoon.
                            </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isDataRequired}
                        onClick={onSubmit}
                    >Submit</Button>
                </Paper>
            </InvoiceProvider>
        </div>
    );
}