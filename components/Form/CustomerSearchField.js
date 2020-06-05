import React from 'react'
import { Field } from "formik";
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
    root: {
    },
}));

const CustomerSearchField = (props) => {
    const classes = useStyles();
    // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
    const top100Films = [
        {
            name: 'Customer 1',
            street_name: '57 Parkway, 5th Floor',
            postal_address: 'New York, NY 10013',
            email: 'casey@test.com'
        },
        {
            name: 'Customer 2',
            street_name: '58 tjsda, 7th Floor',
            postal_address: 'Rotterdam, NY 10013',
            email: 'test@test.com'
        }
    ];
    return (
        <Autocomplete
            id="combo-box-demo"
            options={top100Films}
            onChange={(event, customer) => {
                if (customer.name.startsWith('+ Add')) {

                    console.log('sads');
                     
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
                        name: `+ Add "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            getOptionLabel={(option) => {
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                return option.name
            }
            }
            style={{ width: 300 }}
            renderInput={(params) => (
                <Field component={TextField} {...params} name="customer" label="Selectustomer" fullWidth />
            )}
            renderOption={(option) => option.name}
        />
    )
}

export default CustomerSearchField