import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class CartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        };
    }

    componentDidMount() {
        // Load cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.setState({ cart });
    }

    handleRemoveFromCart = (id) => {
        // Remove product from cart
        const updatedCart = this.state.cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        this.setState({ cart: updatedCart });
        alert(`Product removed from cart!`);
    };

    handleBuyNow = (product) => {
        // Simulatation
        const emailSent = this.sendConfirmationEmail(product);
        if (emailSent) {
            alert(`A confirmation email for ${product.title} has been sent!`);
        }
    };

    sendConfirmationEmail = (product) => {
        // You can replace this with an actual email service API call.
        console.log(`Sending confirmation email for ${product.title}...`);
        return true;
    };

    render() {
        const { cart } = this.state;

        return (
            <div className="container mt-4">
                <h2 className="text-center">Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-center">Your cart is empty.</p>
                ) : (
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.img} alt={product.title} style={{ width: '50px' }} />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger mr-2"
                                            onClick={() => this.handleRemoveFromCart(product.id)}
                                        >
                                            Remove
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => this.handleBuyNow(product)}
                                        >
                                            Buy Now
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default CartComponent;
