import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.jsx';
import { CategoryPreviewContainer, Preview, TitleLink } from './category-preview.styles.jsx';

function CategoryPreview({ title, products }) {
   return (
      <CategoryPreviewContainer>
         <h2>
            <TitleLink to={`/shop/${title}`}>{title.toUpperCase()}</TitleLink>
         </h2>
         <Preview>
            {products.slice(0, 4).map(product => (
               <ProductCard key={product.id} product={product} />
            ))}
         </Preview>
      </CategoryPreviewContainer>
   );
}

export default CategoryPreview;