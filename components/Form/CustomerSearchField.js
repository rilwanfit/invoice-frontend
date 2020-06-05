import React from 'react'
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
  
    const handleClose = () => {
      setOpen(false);
    };

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
        <>
            <CreateCustomerDialog handleClose={handleClose} open={open} />
            <Autocomplete
                clearOnBlur
                options={top100Films}
                onChange={(event, customer) => {
                    
                    if (customer != null && customer.name.startsWith('+ Add')) {
                        setOpen(true);
                    } else if (customer == null) {
                        props.updateCustomer({})
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
                    <Field component={TextField} {...params} name="customer" label="Select customer" fullWidth />
                )}
                renderOption={(option) => option.name}
            />
        </>
    )
}

export default CustomerSearchField