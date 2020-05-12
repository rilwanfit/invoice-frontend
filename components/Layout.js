import Header from './Header';
import { Fragment } from 'react';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout = props => (
  <Fragment>
    <Header />
    <div className="container mt-5">
      <div className="container-fluid pt-2 pb-2 pt-md-4 px-md-5 shadow">
        {props.children}
      </div>
    </div>
  </Fragment>
);

export default Layout;