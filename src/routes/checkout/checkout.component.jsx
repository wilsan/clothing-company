import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout.styles.scss';

function Checkout() {
   const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);
   return (
      <div>
         {cartItems.map(item => {
            const { id, name, quantity } = item;
            return (
               <div key={id}>
                  <h2>{name}</h2>
                  <span>{quantity}</span>
                  <span onClick={() => removeItemFromCart(item)}>decrement</span>
                  <span onClick={() => addItemToCart(item)}>increment</span>
               </div>
            );
         })}
      </div>
   );
}

export default Checkout;
