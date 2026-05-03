// src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../state/CartProvider';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config';

const Cart = () => {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useContext(CartContext);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      updateItemQuantity(id, quantity);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          total: getCartTotal(),
        }),
      });

      if (response.ok) {
        // Clear cart after successful order (optional, depends on your reducer)
        alert('Order placed successfully!');
        window.location.reload();
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="pa3 mt5">
      <h2 className="f4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/" className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between ba pa3 mb2">
              <div className="flex items-center">
                <img src={item.image} alt={item.title} className="w3 h3 mr3" />
                <div>
                  <p className="f6 b">{item.title}</p>
                  <p className="f6">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="w3 mr2 pa1"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="f6 link dim br3 ba bw1 ph2 pv1 dib black pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="tr mt3">
            <p className="f4 b">Total: ${getCartTotal().toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black pointer bg-green white"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
