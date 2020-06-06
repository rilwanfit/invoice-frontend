import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

export default function RequiredCompanyInfoDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Company details required</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide company details before create an invoice.
          </DialogContentText>
        <Divider light />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary" href="/company-info">
          Agree, Create company details
          </Button>
      </DialogActions>
    </Dialog>
  );
}
