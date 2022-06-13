import './category-item.styles.jsx';
import { CategoryItemContainer, BackgroundImage, Body } from './category-item.styles.jsx';

function CategoryItem({ category }) {
   const { imageUrl, title } = category;

   return (
      <CategoryItemContainer>
         <BackgroundImage imageUrl={imageUrl} />
         <Body>
            <h2>{title.toUpperCase()}</h2>
            <p>Shop Now</p>
         </Body>
      </CategoryItemContainer>
   )
}

export default CategoryItem;