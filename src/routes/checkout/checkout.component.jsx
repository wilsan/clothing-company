import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.jsx';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';

function Checkout() {
   const { cartItems, total } = useContext(CartContext);
   return (
      <CheckoutContainer>
         <CheckoutHeader>
            <HeaderBlock><span>Product</span></HeaderBlock>
            <HeaderBlock><span>Description</span></HeaderBlock>
            <HeaderBlock><span>Quantity</span></HeaderBlock>
            <HeaderBlock><span>Price</span></HeaderBlock>
            <HeaderBlock><span>Remove</span></HeaderBlock>
         </CheckoutHeader>
         {cartItems.map(item =>
            <CheckoutItem key={item.id} item={item} />
         )}
         <Total>Total: ₹{total}</Total>
      </CheckoutContainer>
   );
}

export default Checkout;
