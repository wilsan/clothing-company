import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import Button from '../../components/button/button.component';

import './checkout.styles.jsx';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';

function Checkout() {
   const cartItems = useSelector(selectCartItems);
   const cartTotal = useSelector(selectCartTotal);
   const navigate = useNavigate();

   const onNavigateHandler = () => navigate('/payment');

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

         <Total>Total: ₹{cartTotal}</Total>
         
         {cartTotal ? <Button onClick={onNavigateHandler}>Proceed to payment</Button> : null}
      </CheckoutContainer>
   );
}

export default Checkout;
