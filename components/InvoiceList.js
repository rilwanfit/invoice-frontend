import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


const InvoiceList = () => {
    const data = [
        {
            contact: 'Leanne Graham',
            invoice_number: '2020-00001',
            characteristic: '1234',
            amount: '€ 50,00',
            status: 'Active'
        },
        {
            contact: 'Ervin Howell',
            invoice_number: '2020-00002',
            characteristic: '1234',
            amount: '€ 50,00',
            status: 'Active'
        },
        {
            contact: 'Clementine Bauch',
            invoice_number: '2020-00003',
            characteristic: '1234',
            invoice_date: '11-05-2020',
            amount: '€ 50,00',
            status: 'Inactive'
        },
        {
            contact: 'Patricia Lebsack',
            invoice_number: '2020-00004',
            characteristic: '1234',
            invoice_date: '11-05-2020',
            amount: '€ 50,00',
            status: 'Active'
        },
        {
            contact: 'Kamren',
            invoice_number: '2020-00005',
            characteristic: '1234',
            invoice_date: '11-05-2020',
            amount: '€ 50,00',
            status: 'Active'
        },
        {
            contact: 'Dennis Schulist',
            invoice_number: '2020-00006',
            characteristic: '1234',
            invoice_date: '11-05-2020',
            amount: '€ 50,00',
            status: 'Inactive'
        },
        {
            contact: 'Kurtis Weissnat',
            invoice_number: '2020-00007',
            characteristic: '1234',
            invoice_date: '11-05-2020',
            amount: '€ 500,00',
            status: 'Active'
        },
        {
            contact: 'Maxime_Nienow',
            invoice_number: '2020-00008',
            characteristic: '1234',
            invoice_date: '11-05-2020',
            amount: '€ 150,00',
            status: 'Active'
        },
        {
            contact: 'Glenna Reichert',
            invoice_number: '2020-00009',
            characteristic: '1234',
            invoice_date: '11-05-2020',
            amount: '€ 50,00',
            status: 'Inactive'
        },
    ]

    const columns = [
        {
            text: 'Factuurnummer',
            dataField: 'invoice_number'
        }, {
            text: 'Kenmerk',
            dataField: 'characteristic'
        }, {
            text: 'Factuurdatum',
            dataField: 'invoice_date',
            sort: true
        }, {
            text: 'Contact',
            dataField: 'contact'
        }, {
            text: 'Bedrag',
            dataField: 'amount'
        },
        {
            text: 'Status',
            dataField: 'status',
            sort: true
        }
    ]

    return (
        <BootstrapTable keyField='id' data={data} columns={columns} pagination={paginationFactory()} />
    )

}

export default InvoiceList