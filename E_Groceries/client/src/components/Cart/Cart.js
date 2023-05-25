import React, { useState, useEffect } from 'react';
import './Cart.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import PayButton from '../PayButton';
const Cart = () => {
  const [cartitems, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedAddress, setSelectedAddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getaddress', {
          method: 'GET',
          headers: { 'auth': token },
        });
        const result = await response.json();
        console.log(result.addresses);
        setAddressList(result.addresses)
        
      } catch (error) {
        console.log('error in response');
      }
    };
    fetchAddressData();
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'));
    if (data) {
      setCart(data);
      setCount(data.reduce((sum, item) => sum + item.Quantity, 0));
      setTotalPrice(data.reduce((sum, item) => sum + item.TotalPrice, 0));
    }
  }, []);
  // Rest of your component code...

 // Remove the dependency array or pass an empty array
  // Remove the dependency array or pass an empty array
  
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
    console.log(selectedAddress)
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartitems];
    updatedCart.splice(index,1);
    setCart(updatedCart);
    setCount(updatedCart.reduce((sum, item) => sum + item.Quantity, 0));
    setTotalPrice(updatedCart.reduce((sum, item) => sum + item.TotalPrice, 0));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  const handleClearCart = () => {
    setCart([]);
    setCount(0);
    setTotalPrice(0);
    localStorage.removeItem('cart');
  }

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cartitems];
    updatedCart[index].Quantity += 1;
    updatedCart[index].TotalPrice = updatedCart[index].Quantity * updatedCart[index].Price;
    setCart(updatedCart);
    setCount(updatedCart.reduce((sum, item) => sum + item.Quantity, 0));
    setTotalPrice(updatedCart.reduce((sum, item) => sum + item.TotalPrice, 0));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cartitems];
    if (updatedCart[index].Quantity > 1) {
      updatedCart[index].Quantity -= 1;
      updatedCart[index].TotalPrice = updatedCart[index].Quantity * updatedCart[index].Price;
      setCart(updatedCart);
      setCount(updatedCart.reduce((sum, item) => sum + item.Quantity, 0));
      setTotalPrice(updatedCart.reduce((sum, item) => sum + item.TotalPrice, 0));
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }

  return (
    <div className="cart-container">
    <h1 className='mycart'>My Cart</h1>
    {cartitems.length === 0 ? (
      <div> cart
      <p className='cartempty'>Your cart is empty</p></div>
      
    ) : (
      <div>
        <div className="cart-items">
          {cartitems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-image">
                <img src={item.Image} alt={item.ProductName} />
              </div>
              <div className="cart-item-details">
                <div className="cart-item-name">{item.ProductName}</div>
                <div className="cart-item-price">{item.Price} /-</div>
                <div className="cart-item-quantity">
                  <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                  <span>{item.Quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(index)}>+</button>
                </div>
                <div className="cart-item-remove">
                  <button onClick={() => handleRemoveItem(index)}>remove</button>
                </div>
                
  
  
                <div className="cart-item-total-price">{item.TotalPrice} /-</div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <div>Total Items: {count}</div>
          <div>Total Price: {totalPrice} /-</div>
          <div className="address-select">
                  <label>Select address:</label>
                  <select className="address-dropdown" onChange={handleAddressChange}>
                    <option value="">Select Address</option>
                    {addressList.map((address) => (
                      <option key={address._id} value={JSON.stringify(address)}>
                       
                        {address.houseNumber}, {address.street}, {address.city}, {address.state},
                      </option>
                    ))}
                  </select>
                  {selectedAddress ? (
                    <PayButton cartitems = {cartitems} address_list={JSON.parse(selectedAddress)}/> 
                  ) : (
                    <p className="address-placeholder">Please select an address.</p>
                  )}
                </div>
      </div>
      
        <button onClick={handleClearCart} className='clear' >  Clear Cart </button>
        </div>
      
    
    )}
       {/* <div className='Checkout'><Link to ="/Checkout">Checkout</Link></div> */}



    
  </div>
  );
            }
export default Cart;