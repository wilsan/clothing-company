import { Fragment, useContext } from "react";
import { useSelector } from 'react-redux';

import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories.context";
import { selectCategoriesMap } from "../../store/categories/categoriesSlice";

function CategoriesPreview() {
   // const { categoriesMap } = useContext(CategoriesContext);
   const categoriesMap = useSelector(selectCategoriesMap);

   return (
      <Fragment>
         {Object.keys(categoriesMap).map(title => {
            const products = categoriesMap[title];
            return <CategoryPreview key={title} title={title} products={products} />;
         })}
      </Fragment>
   );
}

export default CategoriesPreview;
