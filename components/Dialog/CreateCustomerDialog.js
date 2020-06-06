import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomerForm from '../Form/CustomerForm';

export default function CreateCustomerDialog(props) {

  var inputProps = {
    handleClose: props.handleClose
  };

  if (props.updateCustomer != undefined) {
    inputProps.updateCustomer = props.updateCustomer;
  }
  
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>

          <CustomerForm {...inputProps} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
