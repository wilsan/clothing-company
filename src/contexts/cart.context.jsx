import { createContext, useEffect, useState, useReducer } from "react";

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
   cartTotal: null
});

const CART_ACTION_TYPES = {
   SET_CART_ITEMS: 'SET_CART_ITEMS',
   SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};

// Initial state of the cart reducer object
const INITIAL_STATE = {
   isCartOpen: false,
   cartItems: [],
   cartCount: 0,
   cartTotal: 0
};

const cartReducer = (state, action) => {
   const { type, payload } = action;

   switch (type) {
      case CART_ACTION_TYPES.SET_CART_ITEMS:
         return {
            ...state,
            ...payload
         };
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:
         return {
            ...state,
            isCartOpen: payload
         };
      default:
         throw new Error(`Unhandled type of ${type} in cartReducer`);
   };
};


export const CartProvider = ({ children }) => {
   // const [isCartOpen, setIsCartOpen] = useState(false);
   // const [cartItems, setCartItems] = useState([]);
   // const [cartCount, setCartCount] = useState(0);
   // const [cartTotal, setCartTotal] = useState(0);

   // useEffect(() => {
   //    const newCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
   //    setCartCount(newCartCount);
   // }, [cartItems]);

   // useEffect(() => {
   //    const newCartTotal = cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
   //    setCartTotal(newCartTotal);
   // }, [cartItems]);

   // Defining the functions to set the cart reducer object and dispatching the action objects
   const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
   const { cartItems, cartCount, cartTotal, isCartOpen } = state;

   const addItemToCart = (productToAdd) => {
      const newCartItems = addCartItem(cartItems, productToAdd);
      updateCartItemsReducer(newCartItems);
   };

   const removeItemFromCart = (productToRemove) => {
      const newCartItems = removeCartItem(cartItems, productToRemove);
      updateCartItemsReducer(newCartItems);
   };

   const clearItemFromCart = (itemToClear) => {
      const newCartItems = clearCartItem(cartItems, itemToClear);
      updateCartItemsReducer(newCartItems);
   };

   // Function to dispatch action to toggle isCartOpen
   const setIsCartOpen = (bool) => {
      dispatch({
         type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
         payload: bool
      });
   };

   // Function to dispatch action to update cartItems, cartCount and cartTotal when cartItems is updated
   const updateCartItemsReducer = (newCartItems) => {
      const newCartCount = newCartItems.reduce((acc, curr) => acc + curr.quantity, 0);
      const newCartTotal = newCartItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);

      dispatch({
         type: CART_ACTION_TYPES.SET_CART_ITEMS,
         payload: {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal
         }
      });
   };

   const value = {
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addItemToCart,
      removeItemFromCart,
      cartCount,
      clearItemFromCart,
      cartTotal
   };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
