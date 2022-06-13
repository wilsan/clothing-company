import { useNavigate } from 'react-router-dom';

import './category-item.styles.jsx';
import { CategoryItemContainer, BackgroundImage, Body } from './category-item.styles.jsx';

function CategoryItem({ category }) {
   const { imageUrl, title, route } = category;
   const navigate = useNavigate();

   const onNavigateHandler = () => navigate(route);

   return (
      <CategoryItemContainer onClick={onNavigateHandler}>
         <BackgroundImage imageUrl={imageUrl} />
         <Body>
            <h2>{title.toUpperCase()}</h2>
            <p>Shop Now</p>
         </Body>
      </CategoryItemContainer>
   )
}

export default CategoryItem;