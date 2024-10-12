import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DashNav from '../nav'; 
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    img: '',
    priceBeforeDiscount: '',
    price: '',
    rate: '',
    description: '',
    date: '',
  });

  const [newImages, setNewImages] = useState([]);
  const [errors, setErrors] = useState({}); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Products/${id}`);
        setProduct(response.data); 
      } catch (error) {
        console.error('Error fetching the product!', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
  };

  // const handleImageChange = (e) => {
  //   const imageFiles = Array.from(e.target.files).map(file => file.name);
  //   setNewImages(imageFiles); 
  // };

  const validateForm = () => {
    const newErrors = {};
    const { title, priceBeforeDiscount, price, rate, description, date } = product;


    if (!title || /^\d+$/.test(title)) {
      newErrors.title = 'Product name cannot be just numbers.';
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

    const updatedImages = `/Images/${product.img}`

    const updatedProduct = { ...product, img: updatedImages };

    try {
      await axios.put(`http://localhost:3000/Products/${id}`, updatedProduct);
      console.log('Product updated:', updatedProduct);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('There was an error updating the product!', error);
    }
  };

  return (
    <>
    <DashNav/>
    <div className="container w-75">
      <h2>Edit Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridImages">
          <Form.Label>Image Selected : </Form.Label>
          <div>

          <img
                src={product.img}
                alt={`product-${product.id}`}
                style={{ width: '50px',height:'50px', marginRight: '10px' }}
              />
            {/* {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`product-${index}`}
                style={{ width: '50px',height:'50px', marginRight: '10px' }}
              />
            ))} */}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridNewImages">
          <Form.Label>Upload New Images (Optional)</Form.Label>
          <Form.Control
            type="text"
            name="img"
            value={product.img}
            onChange={handleChange}
            // multiple
            // accept="image/*"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPriceBeforeDiscount">
          <Form.Label>Price Before Discount</Form.Label>
          <Form.Control
            type="number"
            name="priceBeforeDiscount"
            value={product.priceBeforeDiscount}
            onChange={handleChange}
            placeholder="Enter price before discount"
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
            required
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

        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </div>
    </>
  );
};

export default EditProduct;
