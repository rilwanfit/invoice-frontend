import { Fragment } from 'react';
import InvoiceForm from '../components/InvoiceForm';
import { InvoiceProvider } from '../components/InvoiceContext';

export default function createInvoice() {
    return (
        <Fragment>
            <InvoiceProvider>
                <InvoiceForm />
            </InvoiceProvider>
        </Fragment>
    );
  }