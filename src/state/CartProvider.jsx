// src/state/CartProvider.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

// Action Types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.payload.id);

    case UPDATE_ITEM_QUANTITY:
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { id, quantity } });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export { CartContext };
