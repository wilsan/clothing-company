import { createContext, useEffect, useState } from "react";

function addCartItem(cartItems, productToAdd) {
   const found = cartItems.find((item) => item.id === productToAdd.id);

   if (found) {
      return cartItems.map(item => {
         if (item.id === productToAdd.id) {
            return { ...item, quantity: item.quantity + 1 }
         }
         return item;
      });
   }

   return [...cartItems, { ...productToAdd, quantity: 1 }];
}

function removeCartItem(cartItems, productToRemove) {
   const found = cartItems.find((item) => item.id === productToRemove.id);

   if (found.quantity === 1) {
      return cartItems.filter(item => item.id !== found.id);
   } else {
      return cartItems.map(item => {
         if (item.id === productToRemove.id) {
            return { ...item, quantity: item.quantity - 1 }
         }
         return item;
      });
   }
}

function clearCartItem(cartItems, itemToClear) {
   return cartItems.filter(item => item.id !== itemToClear.id);
}

export const CartContext = createContext({
   isCartOpen: null,
   setIsCartOpen: () => { },
   cartItems: [],
   addItemToCart: () => { },
   removeItemFromCart: () => { },
   clearItemFromCart: () => { },
   cartCount: null,
   total: null
});

export const CartProvider = ({ children }) => {
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [cartCount, setCartCount] = useState(0);
   const [total, setTotal] = useState(0);

   const addItemToCart = (productToAdd) => {
      setCartItems(addCartItem(cartItems, productToAdd));
   }

   const removeItemFromCart = (productToRemove) => {
      setCartItems(removeCartItem(cartItems, productToRemove));
   }

   const clearItemFromCart = (itemToClear) => {
      setCartItems(clearCartItem(cartItems, itemToClear));
   }

   useEffect(() => {
      const newCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
      setCartCount(newCartCount);
   }, [cartItems]);

   useEffect(() => {
      const newCartTotal = cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
      setTotal(newCartTotal);
   }, [cartItems]);

   const value = {
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addItemToCart,
      removeItemFromCart,
      cartCount,
      clearItemFromCart,
      total
   };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
