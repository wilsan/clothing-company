import { useDispatch } from 'react-redux';

import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cartSlice';

import './checkout-item.styles.jsx';
import { ImageContainer, CheckoutItemContainer, RemoveButton } from './checkout-item.styles.jsx';

function CheckoutItem({ item }) {
   const { name, imageUrl, price, quantity } = item;
   const dispatch = useDispatch();

   const clearItemHandler = () => { dispatch(clearItemFromCart(item)) };
   const addItemHandler = () => { dispatch(addItemToCart(item)) };
   const removeItemHandler = () => { dispatch(removeItemFromCart(item)) };

   return (
      <CheckoutItemContainer>
         <ImageContainer>
            <img src={imageUrl} alt={name} />
         </ImageContainer>
         <span className='name'>{name}</span>
         <span className='quantity'>
            <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={addItemHandler}>&#10095;</div>
         </span>
         <span className='price'>{price}</span>
         <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
      </CheckoutItemContainer>
   );
}

export default CheckoutItem;
