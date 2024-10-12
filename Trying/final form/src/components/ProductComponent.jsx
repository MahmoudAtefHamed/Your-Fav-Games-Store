import React from 'react';
import { Navigate } from 'react-router-dom';
// import './ProductStyles.css'; 
class ProductComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToCart: false,
            redirectToRegister: false,
            redirectToLogin: false,
            isLoggedIn: false,
        };
    }

    componentDidMount() {
        // Check if the user is logged in
        const user = localStorage.getItem('user');
        this.setState({ isLoggedIn: user ? true : false });
    }

    handleAddToCart = () => {
        if (!this.state.isLoggedIn) {
            this.setState({ redirectToLogin: true });
            return;
        }

        const product = this.getSampleProduct(); // Get sample product

        // Retrieve cart from localStorage and add new product
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${product.title} has been added to your cart!`);
    };

    handleAddToWishlist = () => {
        if (!this.state.isLoggedIn) {
            this.setState({ redirectToLogin: true });
            return;
        }

        const product = this.getSampleProduct();

        // Retrieve wishlist from localStorage and add new product
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        alert(`${product.title} has been added to your wishlist!`);
    };

    handleBuyNow = () => {
        if (!this.state.isLoggedIn) {
            this.setState({ redirectToLogin: true });
        } else {
            this.setState({ redirectToCart: true });
        }
    };


    getSampleProduct() {
        return {
            id: 1,
            title: "Sample Product",
            price: 29.99,
            img: "https://via.placeholder.com/150",
            rate: 4.5,
            description: "This is a sample product for testing purposes.",
        };
    }

    render() {
        const product = this.getSampleProduct();


        if (!product) {
            return <p>Product not found.</p>;
        }

        if (this.state.redirectToCart) {
            return <Navigate to="/cart" />;
        }
        if (this.state.redirectToRegister) {
            return <Navigate to="/login" />;
        }
        if (this.state.redirectToLogin) {
            return <Navigate to="/login" state={{ from: '/product' }} />;
        }

        return (
            <div className="product-card">
                <img src={product.img} alt={product.title} />
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
                <button onClick={this.handleAddToCart}>Add to Cart</button>
                <button onClick={this.handleAddToWishlist}>Add to Wishlist</button>
                <button onClick={this.handleBuyNow}>Buy Now</button>
            </div>
        );
    }
}

export default ProductComponent;
