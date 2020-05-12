import Link from './Link';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Fragment } from 'react';

const authorized = false

const Header = () => (
    <Navbar className="header" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Company Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link href="/about">
                    <a className="nav-link">About</a>
                </Link>
                <Link href="/blog">
                    <a className="nav-link">Blog</a>
                </Link>

                <Link href="/profile">
                    <a className="nav-link">Profile</a>
                </Link>
                <Link href="/invoice">
                    <a className="nav-link">Invoice</a>
                </Link>
            </Nav>
            <Nav>
                {authorized ? (
                    <Nav className="mr-auto">
                        <NavDropdown title={
                            <>

                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
                                <img className="img-profile rounded-circle" src="https://img.icons8.com/clouds/100/000000/user.png" />
                            </>
                        } id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">


                                <i className="fas fa-users fa-sm fa-fw mr-2 text-gray-400" /> Profile
                        </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
           Settings
         </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
           Logout
         </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                ) : (
                        <Fragment>
                            <Link href="/register">
                                <a className="nav-link">Register</a>
                            </Link>
                            <Link href="/login">
                                <a className="nav-link">Login</a>
                            </Link>
                        </Fragment>
                    )}

            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Header;