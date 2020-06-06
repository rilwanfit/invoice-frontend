import React, { useEffect } from 'react'
import axios from 'axios';
import { Field } from "formik";
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import CreateCustomerDialog from '../Dialog/CreateCustomerDialog';

const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
    root: {
    },
}));

const CustomerSearchField = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [autoCompleteOptions, setAutoCompleteOptions] = React.useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios
            .get(process.env.RESTURL + '/api/customers', {
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            })
            .then(response => {
                if (response.status === 200) {
                    const customers = response.data['hydra:member']

                    const preparedOptions = [];

                    customers.forEach((n, i) => {
                        preparedOptions[i] = {
                            company: n['companyName'],
                            address: n['address'],
                            postCode: n['postcode'],
                            city: n['city'],
                            country: n['country'],
                        };
                    });

                    setAutoCompleteOptions(preparedOptions)
                }

            }).catch(error => {
                console.log(error);
            }).finally(() => {
            });
    }, []);
    return (
        <>
            <CreateCustomerDialog handleClose={handleClose} open={open} updateCustomer={props.updateCustomer} />
            <Autocomplete
                clearOnBlur
                options={autoCompleteOptions}
                onChange={(event, customer) => {
                    if (customer != null && customer.company.startsWith('+')) {
                        setOpen(true);
                    } else if (customer == null) {
                        props.updateCustomer({
                            company: '',
                            address: '',
                            postCode: '',
                            city: '',
                            country: '',
                        })
                    } else {
                        props.updateCustomer(customer)
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            company: `+ Toevoegen "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                getOptionLabel={(option) => {
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.company
                }
                }
                style={{ width: 300 }}
                renderInput={(params) => (
                    <Field component={TextField} {...params} name="customer" label="Select customer" fullWidth />
                )}
                renderOption={(option) => option.company}
            />
        </>
    )
}

export default CustomerSearchField