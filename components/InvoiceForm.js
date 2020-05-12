import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import CompanyInfo from './InvoiceForm/CompanyInfo'
import ProductForm from './InvoiceForm/ProductForm'
import CustomerInfo from './InvoiceForm/CustomerInfo'

const InvoiceSchema = Yup.object().shape({
    company_name: Yup.string()
        .required("company naam is verplicht"),
    street_name: Yup.string()
        .required("company naam is verplicht"),
    postal_address: Yup.string()
        .required("company naam is verplicht"),
    phone_number: Yup.string()
        .required("company naam is verplicht"),
    email: Yup.string()
        .required("company naam is verplicht"),
    website: Yup.string()
        .required("company naam is verplicht")
});

const Invoice = ({ _username, _password }) =>

    new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                fetch(process.env.RESTURL + '/invoice', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ _username, _password }, null, 2),
                    mode: 'cors'
                })
                    .then((response) => {
                        if (response.ok) {
                            // const { token } = response.json()
                            // login({ token })
                        } else {
                            reject(new Error('Registration failed.'));
                        }
                    })
            } catch (error) {
                reject(new Error('You have an error in your code or there are Network issues.'));
            }
            resolve(true);
        }, 1000);
    });

const InvoiceForm = () => {
    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col-lg-12 text-center">
                    <h1 className="mt-5">Invoice</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                <a className="btn btn-primary float-right mb-2" href="/create-invoice" role="button">+ Save invoice</a>
                    <div className="container-fluid pt-2 pb-2 pt-md-4 px-md-5 shadow">
                        {/* Invoice heading */}
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td className="border-0">
                                        <div className="row">
                                            <div className="col-md text-center text-md-left mb-3 mb-md-0">
                                                <CompanyInfo />
                                            </div>
                                            <div className="col text-center text-md-right">
                                                <CustomerInfo />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* Invoice items table */}
                        <ProductForm />
                        {/* Thank you note */}
                        <h5 className="text-center pt-2">
                            <p>Wij verzoeken u vriendelijk om het openstaand bedrag van xxxx (retrieve from total at the bottom)
voor xx-xx-xxxx (retrieve from vervaldatum) over te maken op onze rekeningnummer onder
vermelding van het factuurnummer ‘xxxxx (retrieve from #factuurnummer)’.
Voor vragen kunt u contact opnemen per e-mail of telefoon.</p>
                        </h5>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default InvoiceForm;