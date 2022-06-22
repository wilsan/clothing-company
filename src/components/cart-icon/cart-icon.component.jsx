import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CartContext } from '../../contexts/cart.context';
import { setIsCartOpen } from '../../store/cart/cartSlice';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCartCount } from '../../store/cart/cart.selector';

import './cart-icon.styles.jsx';
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.jsx';

function CartIcon() {
   // const { isCartOpen, setIsCartOpen } = useContext(CartContext);
   // const { cartCount } = useContext(CartContext);
   const dispatch = useDispatch();
   const isCartOpen = useSelector(selectIsCartOpen);
   const cartCount = useSelector(selectCartCount);

   const toggleIsCartOpen = () => {
      dispatch(setIsCartOpen(!isCartOpen));
   };

   return (
      <CartIconContainer onClick={toggleIsCartOpen}>
         <ShoppingIcon />
         <ItemCount>{cartCount}</ItemCount>
      </CartIconContainer>
   );
}

export default CartIcon;
