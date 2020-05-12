import React, { createContext, useReducer } from 'react';

export const InvoiceContext = createContext();

const initialState = {
    company: {
        name: "Cocon Administratie & Advies",
        street_name: "Euclideslaan 60",
        postal_address: "3556 Utrecht, The Netherland",
        phone_number: "+555 7 789-1234",
        email: "info@administratie.nl",
        website: "www.coconadministratie.nl",
    },
    customer: {
        name: 'Casey Williams',
        street_name: '57 Parkway, 5th Floor',
        postal_address: 'New York, NY 10013',
        email: 'casey@test.com'
    },
    products: [],
    invoice_data: {
        invoice_number: '#factuurnummer',
        kvk_number: 'KVK123',
        vat_number: '1234',
        iban: 'ABA0123-232-12121',
        created_date: '14th June, 2020',
        due_date: '14th June, 2021'
    }
}


const invoiceReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return {
                ...state,
                products: [...state.capturedPokemons, action.payload],
            }
        default:
            return state;
    }
}

export const InvoiceProvider = (props) => {

    const [state, dispatch] = useReducer(invoiceReducer, initialState)

    const { company, customer, products, invoice_data } = state

    const providerValue = {
        company,
        customer,
        products,
        invoice_data
    };

    return (
        <InvoiceContext.Provider value={providerValue}>
            {props.children}
        </InvoiceContext.Provider>
    )
}