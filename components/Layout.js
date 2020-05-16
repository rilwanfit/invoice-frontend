import { Fragment } from 'react';
import Header from './Header';

const Layout = props => (
  <Fragment>
    <Header />
    <div className="container mt-5">
      <div className="container-fluid pt-2 pb-5 pt-md-4 px-md-5 shadow">
        {props.children}
      </div>
    </div>
  </Fragment>
);

export default Layout;