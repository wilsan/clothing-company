import { useDispatch, useSelector } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cartSlice';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCartCount } from '../../store/cart/cart.selector';

import './cart-icon.styles.jsx';
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.jsx';

function CartIcon() {
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
