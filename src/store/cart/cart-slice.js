import { createSlice } from '@reduxjs/toolkit';
import { addCartItem, removeCartItem, clearCartItem } from './cart.helpers';

const initialState = {
   isCartOpen: false,
   cartItems: []
};

export const cartSlice = createSlice({
   name: 'cart',
   initialState,

   reducers: {
      setIsCartOpen: (state, action) => {
         state.isCartOpen = action.payload;
      },
      addItemToCart: (state, action) => {
         const newCartItems = addCartItem(state.cartItems, action.payload);
         state.cartItems = newCartItems;
      },
      removeItemFromCart: (state, action) => {
         const newCartItems = removeCartItem(state.cartItems, action.payload);
         state.cartItems = newCartItems;
      },
      clearItemFromCart: (state, action) => {
         const newCartItems = clearCartItem(state.cartItems, action.payload);
         state.cartItems = newCartItems;
      }
   }
});

export const { setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;