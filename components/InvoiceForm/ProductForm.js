import React, { useContext, useState, Fragment } from 'react'
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
        .min(1, "Need at least a product")
});

const ProductForm = () => {
    const [finalAmount, setFinalAmount] = useState(100)
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isDataRequired, setIsDataRequired] = useState(false)

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

    return (
        <Formik
            initialValues={{ products }}
            validationSchema={validateSchema}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
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
                    <table className="table">
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

                    <Typography variant="h5" component="h3">{invoice_data.notes}</Typography>

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