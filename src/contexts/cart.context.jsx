import { createContext, useState } from "react";

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

export const CartContext = createContext({
   isCartOpen: null,
   setIsCartOpen: () => null,
   cartItems: [],
   addItemToCart: () => null
});

export const CartProvider = ({ children }) => {
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItem] = useState([]);

   const addItemToCart = (productToAdd) => {
      setCartItem(addCartItem(cartItems, productToAdd));
   }

   const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
