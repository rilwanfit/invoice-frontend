import React, { forwardRef } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import CreateCustomerDialog from './Dialog/CreateCustomerDialog';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white
    }
}));

const tableIcons = {
    // Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <Button {...props} ref={ref}
        variant="contained"
        color="secondary"
        startIcon={<AddBox />}
    >
        Create
  </Button>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function CustomerTable() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        columns: [
            { title: 'naam', field: 'name', required: true },
        ],
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <>
        <MaterialTable
            actions={
                [
                    {
                        icon: tableIcons.Add,
                        isFreeAction: true,
                        onClick: () => {
                            handleClickOpen()
                        }
                    }
                ]
            }
            title="Customer"
            icons={tableIcons}
            columns={state.columns}
            options={{
                actionsColumnIndex: -1
            }}
            data={query =>
                new Promise((resolve, reject) => {
                    let url = process.env.RESTURL + '/api/customers?'
                    url += 'per_page=' + query.pageSize
                    url += '&page=' + (query.page + 1)
                    fetch(url)
                        .then(response => response.json())
                        .then(result => {
                            const doubled = [];

                            result['hydra:member'].forEach((n, i) => {
                                doubled[i] = {
                                    name: n['firstName'] + ' ' + n['lastName'],
                                };
                            });

                            resolve({
                                data: doubled,
                                page: query.page,
                                totalCount: result['hydra:totalItems'],
                            })
                        })
                })}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
            components={{
                Toolbar: props => (
                    <div className={classes.toolbar}>
                        <MTableToolbar {...props} />
                    </div>
                ),
                // Action: props => {
                //     if(props.action.icon === 'add') {
                //         return (
                //             <Button
                //                 onClick={(event) => props.action.onClick(event, props.data)}
                //                 color="primary"
                //                 variant="contained"
                //                 style={{ textTransform: 'none' }}
                //                 size="small"
                //                 disabled
                //             >
                //                 My Button
                //             </Button>
                //         )
                //     }

                //     return null
                // }
            }}
        />
        <CreateCustomerDialog handleClose={handleClose} open={open} />
        </>
    );
}
