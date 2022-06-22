import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CartContext } from '../../contexts/cart.context';
import { setIsCartOpen } from '../../store/cart/cartSlice';
import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.jsx';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';

function CartDropdown() {
   // const { cartItems, setIsCartOpen } = useContext(CartContext);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const cartItems = useSelector(selectCartItems);

   const goToCheckoutHandler = () => {
      navigate('/checkout');
      dispatch(setIsCartOpen(false));
   };

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