import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const InvoiceSchema = Yup.object().shape({
  invoiceNr: Yup.number()
    .integer('')
    .positive('Number should be positive')
    .required("Factuurnummer is required"),
  invoiceDate: Yup.date()
    .required("Factuurnummer is required"),
    invoiceDueDate: Yup.date()
    .required("Factuurnummer is required"),
  name: Yup.string()
    .required("Naam is verplicht")
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
          <Formik
            initialValues={{ invoiceNr: "", invoiceDate: "",invoiceDueDate:""}}
            validationSchema={InvoiceSchema}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              Invoice({ _username: values.email, _password: values.password })
                .then((response) => {
                  // const { token } = response;
                  // login({ token })
                })
                .catch(error => {
                  setFieldError('general', error.message);
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                  
                    <div ID ='under' class="row">
                        
                        <div className="col-4">
                        <br></br>
                        <br></br>
                            <div className=" logo">
                                        <img src='http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG24.png' width="200" height="200" />
                                    </div>
                            </div>
                        <div className="col-8">
                        <br></br>
                        <br></br>
                        <Field
                                type="text"
                                name="companyName"
                                placeholder="Bedrijfsnaam"
                                className={`form-control ${
                                    touched.companyName && errors.companyName ? "is-invalid" : ""
                                    }`}
                            />
                            <ErrorMessage
                                component="div"
                                name="companyName"
                                className="invalid-feedback"
                            />

                            <Field
                                type="text" 
                                name="adresStreet"
                                placeholder="straat +nr"
                                className={`form-control ${
                                    touched.adresStreet && errors.adresStreet ? "is-invalid" : ""
                                    }`}
                            />
                            <ErrorMessage
                                component="div"
                                name="adresStreet"
                                className="invalid-feedback"
                            />

                            <div className="row">
                                <div className="col-6">     
                                    <Field
                                        type="text" 
                                        name="adresPostal"
                                        placeholder="Postcode"
                                        className={`form-control ${
                                            touched.adresPostal && errors.adresPostal ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="adresPostal"
                                        className="invalid-feedback"
                            /></div>
                                <div className="col-6">     
                                    <Field
                                        type="text" 
                                        name="adresCity"
                                        placeholder="City"
                                        className={`form-control ${
                                            touched.adresCity && errors.adresCIty ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="adresCity"
                                        className="invalid-feedback"
                                        />
                                </div>
                            </div>   
                                    <Field
                                            type="email"
                                            name="email"
                                            placeholder="email adress"
                                            className={`form-control ${
                                                touched.email && errors.email ? "is-invalid" : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="email"
                                            className="invalid-feedback"
                                             />
                                                                
                                        <Field
                                            type="text"
                                            name="phoneNumber"
                                            placeholder="tel nr"
                                            className={`form-control ${
                                                touched.phoneNumber && errors.phoneNumber ? "is-invalid" : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="phoneNumber"
                                            className="invalid-feedback"
                                        />
                                        <Field
                                            type="text"
                                            name="btwNr"
                                            placeholder="Btw nummer"
                                            className={`form-control ${
                                                touched.btwNr && errors.btwNr ? "is-invalid" : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="btwNr"
                                            className="invalid-feedback"
                                        />
                                       
                                        <Field
                                            type="Text"
                                            name="kvkNr"
                                            placeholder="Kvk nummer"
                                            className={`form-control ${
                                                touched.kvkNr && errors.kvkNr ? "is-invalid" : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="kvkNr"
                                            className="invalid-feedback"
                                        />
                        </div>
                    </div>
                    <div id='under' className="row">
                        <div className="col-5">
                                <br></br>
                                <br></br>                     
                                <br></br>
                                <br></br>
                                <div className='invoiceInfo1'>
                                        <div className="row">
                                            <div className="col-4 ">
                                                <label htmlFor="invoiceNr">
                                                    Factuurnummer</label>
                                                <label htmlFor='invoiceDate'>
                                                    Factuurdatum</label>
                                                <label htmlFor='invoiceDueDate'>
                                                    Vervaldatum</label>
                                                </div>
                                            <div className="col-8">      
                                                <Field
                                                    type="text"
                                                    name="invoiceNr"
                                                    placeholder="factuurnummer"
                                                    className={`form-control ${
                                                        touched.invoiceNr && errors.invoiceNr ? "is-invalid" : ""
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="invoiceNr"
                                                    className="invalid-feedback"
                                                />

                                                <Field
                                                    type="date" data-date="" data-date-format="DD MMMM YYYY"
                                                    name="invoiceDate"
                                                    placeholder="verzend datum"
                                                    className={`form-control ${
                                                        touched.invoiceDate && errors.invoiceDate ? "is-invalid" : ""
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="invoiceDate"
                                                    className="invalid-feedback"
                                                />

                                                <Field
                                                    type="date" data-date="" data-date-format="DD MMMM YYYY"
                                                    name="invoiceDueDate"
                                                    placeholder="Vervaldatum"
                                                    className={`form-control ${
                                                        touched.invoiceDueDate && errors.invoiceDueDate ? "is-invalid" : ""
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="invoiceDueDate"
                                                    className="invalid-feedback"
                                                />
                                        </div>
                                    </div>
                                </div>
                     
                                    
                                
                        </div>
                        <div className="col-2">
                 
                        </div>
                        <div className="col-5 ">
                            <br></br>
                            <br></br>
                            <h6> Aan:</h6>
                            <br></br>
                            <div className="companyInfo">
                                <Field
                                type="text"
                                name="companyName"
                                placeholder="Bedrijfsnaam"
                                className={`form-control ${
                                    touched.companyName && errors.companyName ? "is-invalid" : ""
                                    }`}
                            />
                            <ErrorMessage
                                component="div"
                                name="companyName"
                                className="invalid-feedback"
                            />

                            <Field
                                type="text" 
                                name="adresStreet"
                                placeholder="straat +nr"
                                className={`form-control ${
                                    touched.adresStreet && errors.adresStreet ? "is-invalid" : ""
                                    }`}
                            />
                            <ErrorMessage
                                component="div"
                                name="adresStreet"
                                className="invalid-feedback"
                            /></div>
                        <div className="row">
                                                        
                                <div className="col-6">     
                                    <Field
                                        type="text" 
                                        name="adresPostal"
                                        placeholder="Postcode"
                                        className={`form-control ${
                                            touched.adresPostal && errors.adresPostal ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="adresPostal"
                                        className="invalid-feedback"
                            /></div>
                                <div className="col-6">     
                                    <Field
                                        type="text" 
                                        name="adresCity"
                                        placeholder="City"
                                        className={`form-control ${
                                            touched.adresCity && errors.adresCIty ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="adresCity"
                                        className="invalid-feedback"
                                        />
                                </div>
                            </div>   
                                    <Field
                                            type="email"
                                            name="email"
                                            placeholder="email adress"
                                            className={`form-control ${
                                                touched.email && errors.email ? "is-invalid" : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="email"
                                            className="invalid-feedback"
                                             />
                                                                
                                        <Field
                                            type="text"
                                            name="phoneNumber"
                                            placeholder="tel nr"
                                            className={`form-control ${
                                                touched.phoneNumber && errors.phoneNumber ? "is-invalid" : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="phoneNumber"
                                            className="invalid-feedback"
                                        />
                                        <div/>
                                        <div/>
                                         <br></br>
                                         <br></br>
                                        
                            
                        </div>
                    </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;