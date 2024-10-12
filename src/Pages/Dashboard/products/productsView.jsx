import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import DashNav from '../nav'; 
import { Link } from 'react-router-dom';
import './ProductView.css'

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/Products/${id}`);
      setProducts(products.filter(product => product.id !== id));
      console.log('Product deleted:', id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(product => 
    product.title?.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <>
      <DashNav onSearch={setSearchTerm} /> 
      <div className="container mt-4">
        <nav className="mb-3">
          <Link to="/products/add" className="btn btn-primary">Add Product</Link>
        </nav>
      </div>
      <div className="container">
        <Table responsive bordered size="sm" className='text-center'>
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price Before Discount</th>
              <th scope="col">Price</th>
              <th scope="col">Rate</th>
              <th scope="col">Images</th>
              <th scope="col">Description</th>
              <th scope="col">Modified Date</th>
              <th scope="col">Controls</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <th scope="row">{index + 1}</th>
                <td className="text-truncate" style={{ maxWidth: '150px' }}>{product.title}</td>
                <td>${product.priceBeforeDiscount}</td>
                <td>${product.price}</td>
                <td>{product.rate}</td>
                <td>
                      <img
                        
                        src={product.img}
                        alt={`Logo number ${product.id}`}
                        className="img-fluid"
                        width="50"
                        style={{ marginRight: '5px', height: '50px' }}
                      />
                  {/* {product.images && product.images.length > 0 ? (
                    product.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Product ${index + 1} - Image ${idx + 1}`}
                        className="img-fluid"
                        width="50"
                        style={{ marginRight: '5px', height: '50px' }}
                      />
                    ))
                  ) : (
                    <span>No Image</span>
                  )} */}
                </td>
                <td className="text-truncate" style={{ maxWidth: '200px' }}>{product.description}</td>
                <td>{product.date}</td>
                <td>
                  <div className='d-flex'>
                    <Link to={`/products/edit/${product.id}`} className="btn btn-warning me-2">Edit</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ProductsView;
