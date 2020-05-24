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
    products: [
        {
            name: 'Product One',
            quantity: 1,
            price: '10000'
        }
    ],
    invoice_data: {
        invoice_number: '#factuurnummer',
        kvk_number: 'KVK123',
        vat_number: '1234',
        iban: 'ABA0123-232-12121',
        created_date: '14th June, 2020',
        due_date: '14th June, 2021',
        notes: 'Wij verzoeken u vriendelijk om het openstaand bedrag van xxxx (retrieve from total at the bottom) voor xx-xx-xxxx (retrieve from vervaldatum) over te maken op onze rekeningnummer onder vermelding van het factuurnummer ‘xxxxx (retrieve from #factuurnummer)’. Voor vragen kunt u contact opnemen per e-mail of telefoon.'
    }
}

const invoiceReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return {
                ...state,
                products: [...state.products, action.payload],
            }
        default:
            return state;
    }
}

export const InvoiceProvider = (props) => {

    const [state, dispatch] = useReducer(invoiceReducer, initialState)

    const { company, customer, products, invoice_data } = state

    const addProduct = products => {
        dispatch({
            type: "ADD_PRODUCT",
            payload: products
        })
    }

    const providerValue = {
        company,
        customer,
        products,
        addProduct,
        invoice_data
    };

    return (
        <InvoiceContext.Provider value={providerValue}>
            {props.children}
        </InvoiceContext.Provider>
    )
}