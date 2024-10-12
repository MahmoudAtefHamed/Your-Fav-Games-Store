import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DashNav from '../nav'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

import img1 from '../../../images/battlefield3.jpg'

const AddProducts = () => {
  const [product, setProduct] = useState({
    title: '',
    img: '', 
    priceBeforeDiscount: '',
    price: '',
    rate: '',
    description: '',
    date: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
  };

  // const handleImageChange = (e) => {
  //   const imageFiles = Array.from(e.target.files).map(file => file.title);
  //   setProduct({ ...product, images: imageFiles });
  // };

//   const handleImageChange = (e) => {
//     const imageFile = e.target.files[0]?.name; 
//     setProduct({ ...product, images: imageFile });
//   };


  const validateForm = () => {
    const newErrors = {};
    const { title, priceBeforeDiscount, price, rate, description, date } = product;

    // Validate title (must not be numbers only)
    if (!title || /^\d+$/.test(title)) {
      newErrors.title = 'Product title cannot be just numbers.';
    }
    
  
    if (priceBeforeDiscount && price > priceBeforeDiscount) {
      newErrors.price = 'Price must be less than or equal to Price Before Discount.';
    }


    if (rate && !/^\d+$/.test(rate)) {
      newErrors.rate = 'Rate must be an integer.';
    }

   
    if (!description) {
      newErrors.description = 'Description is required.';
    }


    const today = new Date().toISOString().split('T')[0];
    if (!date || date !== today) {
      newErrors.date = 'Date must be today.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    // const imagePaths = product.images.map(image => `/Images/${image}`);
    const imagePaths = `/Images/${product.img}`
    const newProduct = { ...product, img: imagePaths };

    try {
      await axios.post('http://localhost:3000/Products', newProduct);
      console.log('Product added:', newProduct);
      navigate('/Dashboard'); 
    } catch (error) {
      console.error('There was an error adding the product!', error);
    }
  };

  return (
    <>
      <DashNav/>
      <div className="container w-75">
        <h2>Add New Product</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridImages">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="text"
              name="img"
              value={product.img}
              onChange={handleChange}
              // multiple
              // accept="images/*"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPriceBeforeDiscount">
            <Form.Label>Price Before Discount</Form.Label>
            <Form.Control
              type="number"
              name="priceBeforeDiscount"
              value={product.priceBeforeDiscount}
              onChange={handleChange}
              placeholder="Enter product price before discount"
              required
              isInvalid={!!errors.priceBeforeDiscount}
            />
            <Form.Control.Feedback type="invalid">{errors.priceBeforeDiscount}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter product price"
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridRate">
            <Form.Label>Rate</Form.Label>
            <Form.Control
              type="number"
              name="rate"
              value={product.rate}
              onChange={handleChange}
              placeholder="Enter product rate"
              isInvalid={!!errors.rate}
            />
            <Form.Control.Feedback type="invalid">{errors.rate}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={product.date}
              onChange={handleChange}
              required
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" >
            Add Product
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddProducts;
