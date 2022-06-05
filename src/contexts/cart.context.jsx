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

export const CartContext = createContext({
   isCartOpen: null,
   setIsCartOpen: () => { },
   cartItems: [],
   addItemToCart: () => { },
   removeItemFromCart: () => { },
   cartCount: null
});

export const CartProvider = ({ children }) => {
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItem] = useState([]);
   const [cartCount, setCartCount] = useState(0);

   const addItemToCart = (productToAdd) => {
      setCartItem(addCartItem(cartItems, productToAdd));
   }

   const removeItemFromCart = (productToRemove) => {
      setCartItem(removeCartItem(cartItems, productToRemove));
   }

   useEffect(() => {
      const newCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
      setCartCount(newCartCount);
   }, [cartItems]);

   const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, cartCount };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
