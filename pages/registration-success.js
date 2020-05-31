import { Fragment } from 'react';
import Link from 'next/link';

export default function registrationSuccess() {
    return (
        <Fragment>
            <div class="text-center">
                <h1 class="display-3">Thank You!</h1>
                <p class="lead"><strong>Please check your email</strong> for further instructions on how to complete your account setup.</p>
                <hr />
                <p>
                    Having trouble? <a href="">Contact us</a>
                </p>
                <p class="lead">
                    <Link href="/">
                        <a class="btn btn-primary btn-sm" href="" role="button">Login to create invoice</a>
                    </Link>
                </p>
            </div>
        </Fragment>
    );
}