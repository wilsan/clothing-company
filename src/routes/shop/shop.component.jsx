import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { setCategories } from '../../store/categories/categories-slice';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

function Shop() {
   const dispatch = useDispatch();

   useEffect(() => {
      const getCategories = async () => {
         const categoriesArray = await getCategoriesAndDocuments();
         dispatch(setCategories(categoriesArray));
      };

      getCategories();
   }, []);

   return (
      <Routes>
         <Route index element={<CategoriesPreview />} />
         <Route path=':category' element={<Category />} />
      </Routes>
   );
}

export default Shop;
