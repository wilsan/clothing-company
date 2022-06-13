import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.jsx';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';

function CartDropdown() {
   const { cartItems, setIsCartOpen } = useContext(CartContext);
   const navigate = useNavigate();

   const goToCheckoutHandler = () => {
      navigate('/checkout');
      setIsCartOpen(false);
   }

   return (
      <CartDropdownContainer>
         <CartItems>
            {
               cartItems.length ? cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
               )) : (
                  <EmptyMessage>Your cart is empty</EmptyMessage>
               )
            }
         </CartItems>
         <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
      </CartDropdownContainer>
   );
}

export default CartDropdown;