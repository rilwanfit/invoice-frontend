import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Router from 'next/router'
import { ApplicationContext } from '../components/ApplicationContext'
import CategoryTable from '../components/Table/CategoryTable';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
    }
}));

export default function CompanyInfo() {
    const classes = useStyles();

    const {
        authenticated
    } = useContext(ApplicationContext)

    useEffect(() => {
        if (!authenticated) {
            Router.push('/')
        }
    });

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
<CategoryTable />
    );
}