import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import ProductComponent from './components/ProductComponent';
import CartComponent from './components/CartComponent';
import WishListComponent from './components/WishListComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">My Cart</Link>
            </li>
            <li>
              <Link to="/wishlist">Wish List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/products" element={<ProductComponent />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/wishlist" element={<WishListComponent />} />
          <Route path="/" element={<LoginComponent />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
