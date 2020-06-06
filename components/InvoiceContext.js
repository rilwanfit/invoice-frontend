import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';

import { ApplicationContext } from './ApplicationContext'
import Router from 'next/dist/next-server/server/router';

export const InvoiceContext = createContext();

const invoiceNumber = (new Date().getFullYear()) + '-' + '0000'

const initialState = {
    company: {
        name: "Cocon Administratie & Advies",
        street_name: "Euclideslaan 60",
        postal_address: "3556 Utrecht, The Netherland",
        phone_number: "+555 7 789-1234",
        email: "info@administratie.nl",
        website: "www.coconadministratie.nl",
        kvk_number: 'KVK123',
        vat_number: '1234',
        provided: false
    },
    customer: {
        company: '',
        address: '',
        postCode: '',
        city: '',
        country: '',
    },
    products: [
        {
            name: 'Product One',
            quantity: 1,
            price: '10000'
        }
    ],
    invoice_data: {
        invoice_number: invoiceNumber,
        created_date: '14th June, 2020',
        due_date: '14th June, 2021',
        notes: 'Wij verzoeken u vriendelijk om het openstaand bedrag van' + +' voor xx-xx-xxxx (retrieve from vervaldatum) over te maken op onze rekeningnummer onder vermelding van het factuurnummer ‘xxxxx (retrieve from #factuurnummer)’. Voor vragen kunt u contact opnemen per e-mail of telefoon.'
    }
}

const invoiceReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return {
                ...state,
                products: [...state.products, action.payload],
            }
        case "UPDATE_COMPANY":
            return {
                ...state,
                company: action.payload,
            }
        case "UPDATE_CUSTOMER":
            return {
                ...state,
                customer: action.payload,
            }
        case "LOADING":
            return {
                ...state,
                loading: action.payload,
            }
        default:
            return state;
    }
}

export const InvoiceProvider = (props) => {

    const {
        authenticated,
        userid,
        token
    } = useContext(ApplicationContext)

    const [state, dispatch] = useReducer(invoiceReducer, initialState)

    const { company, customer, products, invoice_data, loading } = state

    const addProduct = products => {
        dispatch({
            type: "ADD_PRODUCT",
            payload: products
        })
    }

    const setLoading = (value) => {
        dispatch({
            type: "LOADING",
            payload: value
        })
    }

    const updateCompany = company => {
        dispatch({
            type: "UPDATE_COMPANY",
            payload: company
        })
    }

    const updateCustomer = customer => {
        dispatch({
            type: "UPDATE_CUSTOMER",
            payload: customer
        })
    }

    const providerValue = {
        company,
        customer,
        products,
        addProduct,
        invoice_data,
        updateCompany,
        updateCustomer,
        authenticated,
        userid,
        token
    };

    return (
        <InvoiceContext.Provider value={providerValue}>
            {props.children}
        </InvoiceContext.Provider>
    )
}