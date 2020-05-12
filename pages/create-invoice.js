import Layout from '../components/Layout';
import InvoiceForm from '../components/InvoiceForm';
import { InvoiceProvider } from '../components/InvoiceContext';


export default function createInvoice() {
    return (
        <Layout>
            <InvoiceProvider>
                <InvoiceForm />
            </InvoiceProvider>
        </Layout>
    );
  }