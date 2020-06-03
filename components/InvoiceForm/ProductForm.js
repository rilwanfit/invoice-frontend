import React, { useContext, useState, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form, ErrorMessage, FieldArray, useField, useFormikContext } from "formik";
import { TextField, Select } from 'formik-material-ui';
import * as Yup from 'yup';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MuiAlert from '@material-ui/lab/Alert';

import { InvoiceContext } from '../InvoiceContext';
import CompanyInfo from '../InvoiceForm/CompanyInfo';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const validateSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "name must be 3 characters at minimum")
        .required("name is required"),
    street_name: Yup.string()
        .min(3, "street_name must be 3 characters at minimum")
        .required("street_name is required"),
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    products: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required("Name is required"),
                quantity: Yup.number().required("required")
            })
        )
        .min(1, "Need at least a product")
});

const useStyles = makeStyles((theme) => ({
    root: {

    }
}));

const ProductForm = () => {
    const [finalAmount, setFinalAmount] = useState(100)
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isDataRequired, setIsDataRequired] = useState(false)

    const classes = useStyles();

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

    const {
        products,
        addProduct,
        customer,
        invoice_data
    } = useContext(InvoiceContext)

    console.log(products);


    return (
        <Formik
            initialValues={{ name: "", street_name: "", email: "", products: products }}
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
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <span className="d-none d-md-block">
                                <h1>Billed To</h1>
                            </span>
                            <Field
                                type="text"
                                name='name'
                                label="Customer name"
                                placeholder={customer.name}
                                component={TextField}
                            />
                            <br />
                            <Field
                                type="text"
                                name='street_name'
                                label="Street name"
                                placeholder={customer.street_name}
                                component={TextField}
                            />
                            <br />
                            <Field
                                type="email"
                                name='email'
                                label="email"
                                placeholder={customer.email}
                                component={TextField}
                            />
                            {/* <h5 className="mb-0 mt-3">{invoice_data.due_date}</h5> */}
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <CompanyInfo />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>

                        </Grid>
                    </Grid>

                    <table>
                        <thead>
                            <tr>
                                <th>Omschrijving</th>
                                <th>Aantal</th>
                                <th>Tarief</th>
                                <th>BTW</th>
                                <th className="text-right">Totaal</th>
                            </tr>
                        </thead>
                        <tbody>

                            <FieldArray name="products">
                                {({ insert, remove, push }) => (
                                    <Fragment>
                                        {values.products.length > 0 &&
                                            values.products.map((product, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            name={`products.${index}.name`}
                                                            placeholder="Ex: Pursuit Running Shoes"
                                                            component={TextField}
                                                            onKeyUp={e => {
                                                                handleChange(e);
                                                                products[index].name = e.target.value
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="number"
                                                            name={`products.${index}.quantity`}
                                                            placeholder="Enter quantity"
                                                            component={TextField}
                                                            // InputProps={{ notched: true }}
                                                            onKeyUp={e => {
                                                                handleChange(e);
                                                                product.total = product.price
                                                                    ? e.target.value * product.price
                                                                    : 0;

                                                                finalTotalHandler(values)
                                                            }}
                                                            min="1" max="999"
                                                        />
                                                    </td>
                                                    <td><Field
                                                        name={`products.${index}.price`}
                                                        component={TextField}
                                                        placeholder="Enter price"
                                                        type="number"
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

                                                    </td>
                                                    {/* <td>
                                                        <Field name={`products.${index}.tax`} component={Select} placeholder="21% BTW">
                                                            <option value="0.00" label="0% btw" />
                                                            <option value="0.21" label="21 % btw" />
                                                            <option value="0.09" label="9% btw" />
                                                        </Field>
                                                    </td> */}
                                                    <td className="font-weight-bold align-middle text-right text-nowrap"><Field
                                                        name={`products.${index}.total`}
                                                        component={TextField}
                                                        placeholder=""
                                                        disabled={true}
                                                        type="number"
                                                        min="0.00"
                                                        max="9999999.99"
                                                    /></td>
                                                    <td>
                                                        <IconButton aria-label="delete" className="secondary" onClick={() => remove(index)}>
                                                            <DeleteIcon size="1.25em" />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            ))}
                                        <tr>
                                            <td colSpan={5}>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {
                                                        let product = { name: "", quantity: 1, price: "" }
                                                        push(product)
                                                        addProduct(product)
                                                    }}
                                                >Add Product</Button>

                                            </td>
                                        </tr>
                                    </Fragment>
                                )}

                            </FieldArray>

                            <tr>
                                <td colSpan={5} className="text-right border-0 pt-4"><h5>Totaal te betalen: $ {finalAmount}</h5></td>
                            </tr>
                        </tbody>
                    </table>

                    <Typography variant="p" component="p">Wij verzoeken u vriendelijk om het openstaand bedrag van {finalAmount} voor xx-xx-xxxx (retrieve from vervaldatum) over te maken op onze rekeningnummer onder vermelding van het factuurnummer {invoice_data.invoice_number} ’. Voor vragen kunt u contact opnemen per e-mail of telefoon.</Typography>

                    <Divider light />
                    <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        disabled={isDataRequired}
                        onClick={submitForm}
                    >Submit</Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">{errorMessage}</Alert>
                    </Snackbar>
                    {isSubmitting && <LinearProgress />}
                </Form>
            )}

        </Formik>
    )
}

export default ProductForm