
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import banner1 from "../../images/banner1.jpg";
import banner2 from "../../images/banner2.jpg";
import slider1 from "../../images/slider1.jpg";
import slider2 from "../../images/slider2.jpg";
import slider3 from "../../images/back2.jpg";
import { Card } from 'antd';

const { Meta } = Card;


const Home = (props) => {
  


  const [productData, setProductData] = useState({});
  const navigate = useNavigate(); // For navigation

  const fetchOne = async (_id) => {
    const response = await fetch(`http://localhost:3000/Products/${_id}`);
    const data = await response.json();
    setProductData(data);
    return data; // Return the fetched data
  };

  const handleProductClick = async (item) => {
    const data = await fetchOne(item.id); // Fetch the product data
    // Navigate to ProductDetails, passing the product data through the state
    navigate('/ProductDetails', { state: { product: data } });
  };

  const addToCart = (item)=>{
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log(isLoggedIn);
    if(isLoggedIn === "false"){
      alert("You should login first! ");
      navigate("/Login");
      return;
    }
    const userOrders = JSON.parse(localStorage.getItem('cart'));
    if(!userOrders){
      userOrders = [];
    }
    userOrders.push(item);
    localStorage.setItem('cart',JSON.stringify(userOrders));
    alert('Added successfully to your cart')
  

  }
  const addToWishlist = (item)=>{

    
    const userFavs = JSON.parse(localStorage.getItem('wishlist'));
    if(!userFavs){
      userFavs = [];
    }
    userFavs.push(item);
    localStorage.setItem('wishlist',JSON.stringify(userFavs));
    alert('Added successfully to your wish list')
  

  }


  return (
    <Fragment>
      {/* slider */}
      <div className="bacgroundflexability mt-5"></div>
            {/* <section className="slider"></section>
            <div className="bacgroundflexability mt-5"></div> */}
            <div
            id="carouselExampleCaptions"
            className="header carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2000"
            >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={slider1} className="d-block w-100" alt="Banner 1" />
          <div className="carousel-caption d-none d-md-block">
            <div className="card bg-transparent" style={{ width: '18rem' }}>
              <div className="card-body">
      
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src={slider2} className="d-block w-100" alt="Banner 2" />
          <div className="carousel-caption d-none d-md-block">
            <div className="card bg-transparent" style={{ width: '18rem' }}>
              <div className="card-body">
   
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src={slider3} className="d-block w-100" alt="Banner 3" />
          <div className="carousel-caption d-none d-md-block">
            <div className="card bg-transparent" style={{ width: '18rem' }}>
              <div className="card-body">
              
              </div>
            </div>
          </div>
        </div>
       
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
            
            
            {/* End of slider */}

      {/* Banner Section */}
      <div className="container text-center">
        <div className="row">
          <div className="banner1 mt-5 col-12 col-lg-6 col-md-12">
            <img src={banner1} alt="logo" />
            <h1>SAVE <span>10%</span></h1>
          </div>
          <div className="banner2 mt-5 col-12 col-lg-6 col-md-12">
            <img src={banner2} alt="logo" />
            <h1>SAVE <span>10%</span></h1>
          </div>
        </div>
      </div>

      {/* Top Collection Section */}
      <div className="container mt-5">
        <h6 className="text-center"><span>Special Offer</span></h6>
        <h2 className="text-center">TOP COLLECTION</h2>
        <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>

      {/* Cards Section */}
      <div className="container text-center">
        {props.dataRef.map((item) => (
          <div
            key={item.id}
            className="row product-card d-inline-block justify-content-center mt-4 me-4 text-center"
              // Handle card click
          >
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt={item.title} src={item.img} onClick={() => handleProductClick(item)}/>}
            >
              <Meta title={item.title} description={item.price} />
            </Card>
            <div className="addtocart">
              <Link onClick={() => addToCart(item)}>Add to cart</Link>
            </div>
              <div className="logos">
                                    
                <a onClick={() => addToWishlist(item)}><i className="fa fa-heart logo"></i></a>
                <a onClick={() => addToCart(item)}><i className="fa fa-duotone fa-solid fa-cart-shopping logo logo2 mt-4"></i></a>
                {/* <i class="fa-duotone fa-solid fa-cart-shopping"></i> */}

              </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Home;