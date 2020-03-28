import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
    <Link href="/blog">
      <a style={linkStyle}>Blog</a>
    </Link>
    <Link href="/register">
      <a style={linkStyle}>Register</a>
    </Link>
    <Link href="/login">
      <a style={linkStyle}>Login</a>
    </Link>
    <Link href="/profile">
      <a style={linkStyle}>Profile</a>
    </Link>
    <Link href="/invoice">
      <a style={linkStyle}>Invoice</a>
    </Link>
  </div>
);

export default Header;