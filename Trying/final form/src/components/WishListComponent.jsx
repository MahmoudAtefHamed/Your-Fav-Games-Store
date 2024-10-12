import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class WishlistComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: []
        };
    }

    componentDidMount() {

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.setState({ wishlist });
    }

    handleRemoveFromWishlist = (id) => {

        const updatedWishlist = this.state.wishlist.filter(item => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        this.setState({ wishlist: updatedWishlist });
        alert(`Product removed from wishlist!`);
    };

    render() {
        const { wishlist } = this.state;

        return (
            <div className="container mt-4">
                <h2 className="text-center">Wishlist</h2>
                {wishlist.length === 0 ? (
                    <p className="text-center">Your wishlist is empty.</p>
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
                            {wishlist.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.img} alt={product.title} style={{ width: '50px' }} />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => this.handleRemoveFromWishlist(product.id)}
                                        >
                                            Remove
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

export default WishlistComponent;
