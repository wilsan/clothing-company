import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

function CartDropdown() {
   const { cartItems } = useContext(CartContext);

   return (
      <div className='cart-dropdown-container'>
         <div className='cart-items'>
            {cartItems.map(item => (
               <CartItem key={item.id} item={item} />
            ))}
         </div>
         <Button>Go to Checkout</Button>
      </div>
   );
}

export default CartDropdown;