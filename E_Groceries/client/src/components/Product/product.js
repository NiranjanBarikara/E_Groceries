import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import Navbar from '../nav/nav';
import './product.css';
//import { Link } from 'react-router-dom';

const Product = (Image, ProductName) => {
  const [userProduct, setUserProduct] = useState([])
  const [differ, setdiffer] = useState('');
  const [cartitems, setCart] = useState('');   //cart is state variable,that holds the cart data,initial value of c is empty string
  const [message, setmessage] = useState(false) //controls the message should be displayed to user initial value message is false
  const token = Cookies.get('token');
  const navigate = useNavigate()


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getproduct', {
          method: 'GET',
          //   headers: {
          //     "Content-Type": "application/json",
          //    "auth": token,
          //  }

        });
        console.log(response)
        if (response !== 400) {
          const data = await response.json();
          setUserProduct(data);
          console.log(data)
        }
      } catch (error) {
        console.log('error in response');
      }
    };
    fetchProduct();
  }, []);
  const handleFilter = (event) => {
    setdiffer(event.target.value);


  };
  const filterProducts = differ ? userProduct.filter((data) => data.category === differ) : userProduct;

  const handleCartClick = (event, data) => {
    event.preventDefault();

    if (!token) {
      setmessage(true);
      setTimeout(() => {
        setmessage(false)
        navigate('/login')
      }, 1000);
    } else {
      setmessage(true);
      setTimeout(() => {
        setmessage(false)
      }, 1000);

      const cartstorage = localStorage.getItem('cart'); // existing cart
      const cartitems = cartstorage ? JSON.parse(cartstorage) : []; // convert cart to array

      const newProduct = {
        ...data,
        Quantity: Number(data.Quantity), // convert quantity to number
        Price: Number(data.Price), // convert price to number
      };

      // calculate total price based on quantity
      const totalPrice = newProduct.Quantity * newProduct.Price;

      // add total price to product object
      const newProductWithTotalPrice = {
        ...newProduct,
        TotalPrice: totalPrice,
      };

      const newCart = [...cartitems, newProductWithTotalPrice]; // add new product to cart

      const newCartStorage = JSON.stringify(newCart); // convert to string
      localStorage.setItem('cart', newCartStorage); // update local storage
      setCart(newCart); // update state
    }
  };

  return (



    <div className='btn6'>
      {/* <Navbar /> */}
      <div className='btn'>
        <button value="" onClick={handleFilter}> All</button>
        <button value='Sweets' onClick={handleFilter}>Sweets</button>
        <button value='Fruits' onClick={handleFilter}>Fruits</button>
        <button value='Vegetables' onClick={handleFilter}>Vegetables</button>
        <button value='Beverages' onClick={handleFilter}>Beverages</button>
        <button value='Snacks' onClick={handleFilter}>Snacks</button>
        <button value='Cakes' onClick={handleFilter}>Bakery, Cakes & Dairy</button>
        <button value='Ready' onClick={handleFilter}>Ready To Cook  & Eat </button>
      </div>
      <br></br> <br></br>
      {message && (token ? (
        <div className='messagesuccess'>Item added to cart"</div>
      ) : (
        <div className='messageunsuccess'>please Login to add items to cart </div>
      ))}
      <div className='shopping-cards'>
        {filterProducts.map((data, index) => (
          <form className='productform' key={index}>
            <img src={data.Image} ></img>
            <br></br>
            <div className='details'>
              <br></br>
              <p className='ProductName'> {data.ProductName}</p>
              <p className='Price'>{data.Price}/- </p>
            </div>
            {/* <b className='category'>{data.category} </b> */}
            <b className='Quantity'>{data.Quantity} kg</b>
            <button onClick={(event) => handleCartClick(event, data)} >ADD TO CART</button>
          </form>
        ))}
      </div>


    </div>


  );
};

export default Product;