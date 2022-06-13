import './cart-item.styles.jsx';

import { CartItemContainer, ItemDetails, Name } from './cart-item.styles.jsx';

function CartItem({ item }) {
   const { name, imageUrl, price, quantity } = item;

   return (
      <CartItemContainer>
         <img src={imageUrl} alt={name} />
         <ItemDetails>
            <Name>{name}</Name>
            <span>{quantity} x ₹{price}</span>
         </ItemDetails>
      </CartItemContainer>
   );
}

export default CartItem;
