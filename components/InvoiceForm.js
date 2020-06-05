import React, { useContext, useState, Fragment, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Formik, Field, Form, ErrorMessage, FieldArray, useField, useFormikContext } from "formik";
import { TextField, Select } from 'formik-material-ui';
import * as Yup from 'yup';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from "@material-ui/core/LinearProgress";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MuiAlert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import CurrencyTextField from '@unicef/material-ui-currency-textfield'


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const TableWithNoBorderCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(TableCell);

import { InvoiceContext } from './InvoiceContext';
import RequiredCompanyInfoDialog from './Dialog/RequiredCompanyInfoDialog';
import CustomerSearchField from './Form/CustomerSearchField';


import { Cookies } from 'react-cookie';
const cookies = new Cookies();

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const validateSchema = Yup.object().shape({
    products: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required("Name is required"),
                quantity: Yup.number().required("required")
            })
        )
        .min(1, "Need at least a product"),
});

const TAX_RATE = 0.07;

function ccyFormat(num) {
    return '€ ' + `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const useStyles = makeStyles((theme) => ({
    root: {

    },
    mediaQuery: theme.breakpoints.down('sm'),
    table: {
        minWidth: 700,
    }
}));

const InvoiceForm = (props) => {
    const [finalAmount, setFinalAmount] = useState(100)
    const [open, setOpen] = React.useState(false);
    const [hasCompanyAlert, setHasCompanyAlert] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isDataRequired, setIsDataRequired] = useState(false)

    const classes = useStyles();

    const fullScreen = useMediaQuery(classes.mediaQuery);

    const {
        products,
        addProduct,
        customer,
        company,
        updateCompany,
        updateCustomer,
        invoice_data,
        userid,
        token
    } = useContext(InvoiceContext)

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const finalTotalHandler = (values) => {
        let total = 0
        values.products.map((product, index) => (
            total += product.total
        ))

        setFinalAmount(total)
    }

    useEffect(() => {
        axios
            .get(process.env.RESTURL + '/api/users/' + userid, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => {
                if (response.status === 200) {
                    let company = {
                        name: response.data.company.name,
                        street_name: response.data.company.address,
                        postal_address: response.data.company.address,
                        phone_number: response.data.company.phone,
                        email: response.data.company.email,
                        website: 'www.info.com',
                        kvk_number: response.data.company.kvkNumber,
                        vat_number: response.data.company.vatNumber,
                        iban: response.data.company.iban,
                        provided: response.data.company.provided,
                    }

                    updateCompany(company)

                    if (company.provided === false) {
                        setHasCompanyAlert(true)
                    }
                }

            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
    }, []);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <RequiredCompanyInfoDialog handleClose={setHasCompanyAlert} open={hasCompanyAlert} />
            <Formik
                initialValues={{ name: "", street_name: "", email: "", postal: "", city: "", invoice_date: "", products: products }}
                validationSchema={validateSchema}
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                    setSubmitting(false);
                    axios
                        .post(process.env.RESTURL + '/api/invoices', {
                            invoiceNumber: invoice_data.invoice_number,
                            customer: {
                                name: customer.name,
                                street_name: customer.street_name,
                                postal_address: customer.postal_address,
                                email: customer.email
                            },
                            product: products,
                            notes: invoice_data.notes
                        }, {
                            headers: {
                                Authorization: 'Bearer ' + cookies.get('token')
                            }
                        })
                        .then(response => {
                            console.log(response);
                        }).catch(error => {
                            if (error.response.data['hydra:description']) {
                                setErrorMessage(error.response.data['hydra:description'])
                                handleClick()
                            } else {
                                setErrorMessage('Unknown error')
                            }
                        }).finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({ values, errors, touched, submitForm, isSubmitting, handleChange, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={6} justify="space-between">
                            <Grid item md={6}>

                                <CustomerSearchField updateCustomer={updateCustomer} />
                                
                                <h4 className="mb-0">{customer.name}</h4>
                                {customer.street_name}<br />
                                {customer.postal_address}<br />
                                {customer.email}<br />
                                <br />
                                <br />
            Factuurnummer: {invoice_data.invoice_number} <br />
            Factuurdatum: {'10th June, 2021'}<br />
            Vervaldatum: {'14th June, 2021'}<br />
                                {/* Vervaldatum: {invoice_data.due_date}<br /> */}
                            </Grid>
                            <Grid item md={6} >
                                <img className="logo img-fluid mb-3" src="https://docamatic.s3-eu-west-1.amazonaws.com/assets/360_logo.png" style={{ maxHeight: '140px' }} />
                                <br />
                                <h2 className="mb-1">{company.name}</h2>
                                {company.address}<br />
                                {company.website}  / {company.phone_number}<br />
                                <strong>{company.email}</strong>
                                <br />
                                <br />
                        KVK-nummer: {company.kvk_number}<br />
                        BTW-nummer: {company.vat_number}<br />
                        IBAN: {company.iban}<br />
                            </Grid>
                            <Grid item spacing={3}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ width: '30rem' }}>Omschrijving</TableCell>
                                                <TableCell align="right">Aantal.</TableCell>
                                                <TableCell align="right">Tarief</TableCell>
                                                <TableCell align="right">Btw</TableCell>
                                                <TableCell align="right">Totaal</TableCell>
                                                <TableCell align="right">Actie</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* {rows.map((row) => (
                                                <TableRow key={row.desc}>
                                                    <TableCell>{row.desc}</TableCell>
                                                    <TableCell align="right">{row.qty}</TableCell>
                                                    <TableCell align="right">{row.unit}</TableCell>
                                                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                                </TableRow>
                                            ))} */}
                                            <FieldArray name="products">
                                                {({ insert, remove, push }) => (
                                                    <Fragment>
                                                        {values.products.length > 0 &&
                                                            values.products.map((product, index) => (
                                                                <TableRow key={index}>
                                                                    <TableWithNoBorderCell scope="row">
                                                                        <Field
                                                                            name={`products.${index}.name`}
                                                                            placeholder="Ex: Pursuit Running Shoes"
                                                                            component={TextareaAutosize}
                                                                            rowsMin={1}
                                                                            style={{ minWidth: 350, borderTop: 'none', borderRight: 'none', borderLeft: 'none', padding: 10 }}
                                                                            onKeyUp={e => {
                                                                                handleChange(e);
                                                                                products[index].name = e.target.value
                                                                            }}
                                                                        />
                                                                    </TableWithNoBorderCell>
                                                                    <TableWithNoBorderCell align="right">
                                                                        <Field
                                                                            type="number"
                                                                            name={`products.${index}.quantity`}
                                                                            placeholder="Enter quantity"
                                                                            style={{ width: 50 }}
                                                                            component={TextField}
                                                                            onKeyUp={e => {
                                                                                handleChange(e);
                                                                                product.total = product.price
                                                                                    ? e.target.value * product.price
                                                                                    : 0;

                                                                                finalTotalHandler(values)
                                                                            }}
                                                                            min="1" max="999"
                                                                        />
                                                                    </TableWithNoBorderCell>
                                                                    <TableWithNoBorderCell align="right">
                                                                        <Field
                                                                            name={`products.${index}.price`}
                                                                            style={{ width: 100 }}
                                                                            component={CurrencyTextField}
                                                                            currencySymbol="€"
                                                                            decimalCharacter=","
                                                                            digitGroupSeparator="."
                                                                            placeholder="Enter price"
                                                                            min="0.00"
                                                                            max="9999999.99"
                                                                            onKeyUp={e => {
                                                                                handleChange(e);
                                                                                product.total = product.quantity
                                                                                    ? e.target.value * product.quantity
                                                                                    : 0;
                                                                                finalTotalHandler(values)
                                                                                products[index].total = e.target.value
                                                                            }}
                                                                        />

                                                                    </TableWithNoBorderCell>
                                                                    <TableWithNoBorderCell align="right">
                                                                        <Field name={`products.${index}.tax`} component={Select} placeholder="21% BTW">
                                                                            <option value="0.00" label="0% btw" />
                                                                            <option value="0.21" label="21 % btw" />
                                                                            <option value="0.09" label="9% btw" />
                                                                        </Field>
                                                                    </TableWithNoBorderCell>
                                                                    <TableWithNoBorderCell align="right" className="font-weight-bold align-middle text-right text-nowrap"><Field
                                                                        name={`products.${index}.total`}
                                                                        style={{ width: 100 }}
                                                                        component={CurrencyTextField}
                                                                        currencySymbol="€"
                                                                        decimalCharacter=","
                                                                        digitGroupSeparator="."
                                                                        placeholder=""
                                                                        disabled={true}
                                                                    /></TableWithNoBorderCell>

                                                                    <TableWithNoBorderCell>
                                                                        <Tooltip title="Delete">
                                                                            <IconButton aria-label="delete" className="secondary" onClick={() => remove(index)}>
                                                                                <DeleteIcon size="1.25em" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </TableWithNoBorderCell>
                                                                </TableRow>
                                                            ))}
                                                        <TableRow>
                                                            <TableWithNoBorderCell colSpan={6}>

                                                                <Tooltip title="Add" aria-label="add">
                                                                    <Fab color="primary" className={classes.fab} onClick={() => {
                                                                        let product = { name: "", quantity: 1, price: "" }
                                                                        push(product)
                                                                        addProduct(product)
                                                                    }}>
                                                                        <AddIcon />
                                                                    </Fab>
                                                                </Tooltip>
                                                            </TableWithNoBorderCell>
                                                        </TableRow>
                                                    </Fragment>
                                                )}
                                            </FieldArray>

                                            <TableRow>
                                                <TableCell rowSpan={3} colSpan={2} />
                                                <TableCell colSpan={2}>Subtotal</TableCell>
                                                <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Tax</TableCell>
                                                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={2}>Total</TableCell>
                                                <TableCell align="right">{ccyFormat(finalAmount)}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            <Grid item justify='flex-end'>
                                <Typography variant="p" component="p">Wij verzoeken u vriendelijk om het openstaand bedrag van {finalAmount} voor xx-xx-xxxx (retrieve from vervaldatum) over te maken op onze rekeningnummer onder vermelding van het factuurnummer {invoice_data.invoice_number} ’. Voor vragen kunt u contact opnemen per e-mail of telefoon.</Typography>
                            </Grid>
                            <Grid item>
                                <Divider light />
                            </Grid>
                        </Grid>

                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            <Button
                                variant="contained"
                                color="primary"
                                type="button"
                                disabled={isDataRequired}
                                onClick={submitForm}
                            >Save invoice</Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error">{errorMessage}</Alert>
                            </Snackbar>
                        </Grid>
                        {isSubmitting && <LinearProgress />}
                    </Form>
                )}

            </Formik>
        </MuiPickersUtilsProvider>
    )
}

export default InvoiceForm