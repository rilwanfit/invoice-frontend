import Link from './Link';

const Header = () => (
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
);

export default Header;