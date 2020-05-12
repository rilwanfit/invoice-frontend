import React, { Fragment, useContext } from 'react'
import { InvoiceContext } from '../InvoiceContext';

const CustomerInfo = () => {

    const {
        customer,
        invoice_data
    } = useContext(InvoiceContext)

    return (
        <Fragment>
            {/* Dont' display Bill To on mobile */}
            <span className="d-none d-md-block">
                <h1>Billed To</h1>
            </span>
            <h4 className="mb-0">{customer.name}</h4>
            {customer.street_name}<br />
            {customer.postal_address}<br />
            {customer.email}<br />
            <h5 className="mb-0 mt-3">{invoice_data.due_date}</h5>
            <br />
            <br />
            Factuurnummer: {invoice_data.invoice_number} <br />
            Factuurdatum: {invoice_data.create_date}<br />
            Vervaldatum: {invoice_data.due_date}<br />
        </Fragment>
    )
}

export default CustomerInfo