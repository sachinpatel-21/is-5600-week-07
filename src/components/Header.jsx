// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartProvider';

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-black-90 fixed w-100 ph3 pv3 ph4-m ph5-l">
      <nav className="f6 fw6 ttu tracked">
        <Link to="/" className="link dim white dib mr3">
          Prints
        </Link>
        <Link to="/cart" className="link dim white dib mr3">
          Cart ({totalItems})
        </Link>
        <Link to="/orders" className="link dim white dib">
          Orders
        </Link>
      </nav>
    </header>
  );
};

export default Header;
