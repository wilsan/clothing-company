import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { setCategories } from '../../store/categories/categories-slice';
import { fetchCategoriesAsync } from '../../store/categories/categories-slice';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

function Shop() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchCategoriesAsync());
   }, []);

   return (
      <Routes>
         <Route index element={<CategoriesPreview />} />
         <Route path=':category' element={<Category />} />
      </Routes>
   );
}

export default Shop;
