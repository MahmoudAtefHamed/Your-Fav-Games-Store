import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddProducts from './products/addProducts';
import ProductsView from './products/productsView';

import EditProduct from './products/editProduct';

const Products = () => {
  return (
    <>
        <Routes>
          <Route path="/products/add" element={<AddProducts />} />
          <Route path="/dashboard" element={<ProductsView />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
         
        </Routes>
    
    </>
  );
};

export default Products;
