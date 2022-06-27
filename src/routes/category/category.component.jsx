import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap, selectCategoriesFetchStatus } from '../../store/categories/categories.selector';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import './category.styles.jsx';
import { CategoryContainer, Title } from './category.styles.jsx';

function Category() {
   const { category } = useParams();
   const categoriesMap = useSelector(selectCategoriesMap);
   const fetchStatus = useSelector(selectCategoriesFetchStatus);
   const [products, setProducts] = useState(categoriesMap[category]);

   useEffect(() => {
      setProducts(categoriesMap[category]);
   }, [category, categoriesMap]);

   return (
      <Fragment>
         <Title>{category.toUpperCase()}</Title>
         {
            fetchStatus === 'loading' ? (
               <Spinner />
            ) : (
               <CategoryContainer>
                  {products && products.map(product => <ProductCard key={product.id} product={product} />)}
               </CategoryContainer>
            )
         }

      </Fragment>
   );
}

export default Category;