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
    {props.children}
  </div>
  </Fragment>
);

export default Layout;