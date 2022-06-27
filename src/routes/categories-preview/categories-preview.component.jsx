import { Fragment } from "react";
import { useSelector } from 'react-redux';

import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

import { selectCategoriesMap, selectCategoriesFetchStatus } from "../../store/categories/categories.selector";

function CategoriesPreview() {
   const categoriesMap = useSelector(selectCategoriesMap);
   const fetchStatus = useSelector(selectCategoriesFetchStatus);

   return (
      <Fragment>
         {
            fetchStatus === 'loading' ? (
               <Spinner />
            ) : (
               Object.keys(categoriesMap).map(title => {
                  const products = categoriesMap[title];
                  return <CategoryPreview key={title} title={title} products={products} />;
               })
            )
         }
      </Fragment>
   );
}

export default CategoriesPreview;
