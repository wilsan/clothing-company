import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button, { BUTTON_TYPE } from '../button/button.component';

import './product-card.styles.jsx';
import { ProductCardContainer, Footer, Name, Price } from './product-card.styles';

function ProductCard({ product }) {
   const { name, price, imageUrl } = product;
   const { addItemToCart } = useContext(CartContext);

   const addProductToCart = () => {
      addItemToCart(product);
   }

   return (
      <ProductCardContainer>
         <img src={imageUrl} alt={name} />
         <Button buttonType={BUTTON_TYPE.inverted} onClick={addProductToCart}>Add to Cart</Button>
         <Footer>
            <Name>{name}</Name>
            <Price>{price}</Price>
         </Footer>
      </ProductCardContainer>
   );
}

export default ProductCard;