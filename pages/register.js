import RegisterForm from '../components/RegisterForm';
import Layout from '../components/Layout';


export default function Register() {
    return (
        <Layout>
            <div className="container">
                <h1 className="mt-1">Register Form</h1>
                <div className="row">
                    <RegisterForm />
                </div>
            </div>
        </Layout>
    );
}