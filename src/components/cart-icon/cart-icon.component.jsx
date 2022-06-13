import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.jsx';
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.jsx';

function CartIcon() {
   const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
   const toggleIsCartOpen = () => {
      setIsCartOpen(!isCartOpen);
   };

   return (
      <CartIconContainer onClick={toggleIsCartOpen}>
         <ShoppingIcon />
         <ItemCount>{cartCount}</ItemCount>
      </CartIconContainer>
   );
}

export default CartIcon;