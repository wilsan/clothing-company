export function addCartItem(cartItems, productToAdd) {
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

export function removeCartItem(cartItems, productToRemove) {
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

export function clearCartItem(cartItems, itemToClear) {
   return cartItems.filter(item => item.id !== itemToClear.id);
}
