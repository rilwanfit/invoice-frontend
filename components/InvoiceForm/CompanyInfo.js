import React, { Fragment, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InvoiceContext } from '../InvoiceContext';


const CompanyInfo = () => {
    
    const {
        company,
        invoice_data
    } = useContext(InvoiceContext)

    return (
        <Fragment>
            <Formik
                initialValues={{
                    invoiceNr: "",
                    invoiceDate: "",
                    invoiceDueDate: ""
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <img className="logo img-fluid mb-3" src="https://docamatic.s3-eu-west-1.amazonaws.com/assets/360_logo.png" style={{ maxHeight: '140px' }} />
                        <br />
                        <h2 className="mb-1">{company.name}</h2>
                        {company.name}, {company.name}<br />
                        {company.website}  / {company.phone_number}<br />
                        <strong>{company.email}</strong>
                        <br />
                        <br />
                <h3>Verkoopfactuur {invoice_data.invoice_number}</h3>
                        KVK-nummer: {invoice_data.kvk_number}<br />
                        BTW-nummer: {invoice_data.vat_number}<br />
                        IBAN: {invoice_data.iban}<br />
                    </Form>
                )}
            </Formik>
        </Fragment>
    )
}

export default CompanyInfo