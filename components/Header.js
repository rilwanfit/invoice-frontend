import Link from './Link';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Header = () => (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars" />
        </button>
        {/* Topbar Navbar */}
        <ul className="nav nav-pills">
            <Link href="/">
                <a className="nav-link">Home</a>
            </Link>
            <Link href="/about">
                <a className="nav-link">About</a>
            </Link>
            <Link href="/blog">
                <a className="nav-link">Blog</a>
            </Link>
            <Link href="/register">
                <a className="nav-link">Register</a>
            </Link>
            <Link href="/login">
                <a className="nav-link">Login</a>
            </Link>
            <Link href="/profile">
                <a className="nav-link">Profile</a>
            </Link>
            <Link href="/invoice">
                <a className="nav-link">Invoice</a>
            </Link>
        </ul>
        <ul className="navbar-nav ml-auto">
            <div className="topbar-divider d-none d-sm-block" />
            {/* Nav Item - User Information */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-item dropdown no-arrow" />
            <Navbar.Collapse id="basic-navbar-nav">
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
                        <NavDropdown.Item href="#action/3.3">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
           Activity Log
         </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
           Logout
         </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </ul>
    </nav>
);

export default Header;