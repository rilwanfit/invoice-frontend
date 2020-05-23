import React, { Fragment } from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray, useField, useFormikContext } from "formik";
import { TextField, Select } from 'formik-material-ui';
import * as Yup from 'yup';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const initialValues = {
    products: [
        {
            name: "",
            quantity: "",
            price: "",
            tax: "",
            total: ""
        }
    ]
};

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

const TotalField = props => {
    const {
        values: { price, tax },
        touched,
        setFieldValue,
    } = useFormikContext();
    const [field, meta] = useField(props);

    React.useEffect(() => {
        console.log(touched.price);

        // set the value of Total, based on price and tax
        if (
            //   price.trim() !== '' &&
            //   tax.trim() !== '' &&
            touched.price &&
            touched.tax
        ) {
            setFieldValue(props.name, `price`);
        }
    }, [tax, price, touched.price, touched.tax, setFieldValue, props.name]);

    return (
        <>
            {props.name.value}
        </>
    );
};

const errorCheck = (name, index, errors, touched) => {
    return (
        errors &&
        errors.products &&
        errors.products[index] &&
        errors.products[index].name &&
        (touched &&
            touched.products &&
            touched.products[index] &&
            touched.products[index].name)
    )
}

const ProductForm = () => {

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
        >
            {({ values, errors, touched, handleReset, handleChange, setFieldValue, handleBlur }) => (
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
                                                            InputProps={{ notched: true }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="number"
                                                            name={`products.${index}.quantity`}
                                                            placeholder="Enter quantity"
                                                            component={TextField}
                                                            InputProps={{ notched: true }}
                                                            onChange={e => {
                                                                handleChange(e);
                                                                product.total = product.price
                                                                    ? e.target.value * product.price
                                                                    : 0;
                                                            }}
                                                            onBlur={e => {
                                                                handleBlur(e);
                                                                product.total = product.price
                                                                    ? e.target.value * product.price
                                                                    : 0;
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
                                                        onChange={e => {
                                                            handleChange(e);
                                                            product.total = product.quantity
                                                                ? e.target.value * product.quantity
                                                                : 0;
                                                        }}
                                                        onBlur={e => {
                                                            handleBlur(e);
                                                            product.total = product.quantity
                                                                ? e.target.value * product.quantity
                                                                : 0;
                                                        }}
                                                    />

                                                    </td>
                                                    <td>
                                                        <Field name={`products.${index}.tax`} component={Select} placeholder="21% BTW">
                                                            <option value="0.00" label="0% btw" />
                                                            <option value="0.21" label="21 % btw" />
                                                            <option value="0.09" label="9% btw" />
                                                        </Field>
                                                    </td>
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
                                                            <DeleteIcon size="1.25em" color="red" />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            ))}
                                        <tr>
                                            <td colSpan={5}>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => push({ name: "" })}
                                                >Add Product</Button>

                                            </td>
                                        </tr>
                                    </Fragment>
                                )}

                            </FieldArray>

                            <tr>
                                <td colSpan={5} className="text-right border-0 pt-4"><h5>Totaal te betalen: $248.00 USD</h5></td>
                            </tr>
                        </tbody>
                    </table>

                </Form>
            )}

        </Formik>
    )
}

export default ProductForm