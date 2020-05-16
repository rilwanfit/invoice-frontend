import { Fragment } from 'react';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
    return (
        <Fragment>
            <div className="container">
                <h1 className="mt-1">Register Form</h1>
                <div className="row">
                    <RegisterForm />
                </div>
            </div>
        </Fragment>
    );
}