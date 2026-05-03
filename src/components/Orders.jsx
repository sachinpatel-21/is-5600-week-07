// src/components/Orders.js
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pa3 mt5">
      <h2 className="f4">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="ba pa3 mb3">
            <p className="f6 b">Order #{order.id}</p>
            <p className="f6">Total: ${order.total}</p>
            <p className="f6">Items: {order.items?.length || 0}</p>
            <div className="mt2">
              {order.items?.map((item) => (
                <div key={item.id} className="f6 pl2">
                  - {item.title} (x{item.quantity}) — ${item.price * item.quantity}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
