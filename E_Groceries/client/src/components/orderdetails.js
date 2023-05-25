
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './orderdetails.css';

const CheckoutSuccess = () => {
  const [userorder, setUserorder] = useState([]);
  const [user, setUser] = useState({});
  const [details, setDetails] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getuser', {
          method: 'GET',
          headers: { 'auth': token },
          
        });
        const data = await response.json();
        setUser(data);
        // console.log(data)
      } catch (error) {
        console.log('error in response');
      }
    };

    getuser();
  }, []);

  useEffect(() => {
    const fetchGetorderdetails = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getorder', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          }
        });
        const data = await response.json();
        setUserorder(data);
        // console.log(data);
      } catch (error) {
        console.log('Error in response:', error);
      }
    };
    fetchGetorderdetails();
  }, [token]);

  const handleOrderDetails = (order) => {
    setDetails( order);
  };
  const handledetailscancel =() => {
    setDetails(null);
  }

return (
 
  <div className="user-orders-container">
        <h1>User Orders</h1>
        {Array.isArray(userorder) && userorder.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Products</th>
              <th>Product Price</th>
              <th>Payment Status</th>
              <th>Order Placed Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userorder.map((order) => (
              <tr className="order-row" key={order._id}>
                <td>
                  {order.products.map((product) => (
                    <div key={product._id} className="product-details">
                      <h5>{product.ProductName}</h5>
                    </div>
                  ))}
                </td>
                <td>
                  <ul className="product">
                    {order.products.map((product) => (
                      <div key={product._id}>
                        <div>
                          <p>{product.Price}</p>
                        </div>
                      </div>
                    ))}
                  </ul>
                </td>
                <td >{order.payment_status}</td>
                <td> {new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="order-details-button" onClick={() => handleOrderDetails(order)}>
                    details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    ):(
      <p>no products found</p>
    )}
  
  {details && (
    <div className='det'>
      <div className='content'>
      <p> <b>Name:</b> { user.firstName}</p>
      <p> <b>Email:</b> { user.email}</p>
      
      <p><b>Payment Status:</b> {details.payment_status}</p>
      
      <p className='shipping'><b>Shipping Address:</b>   {details.shipping.houseNumber}, {details.shipping.street}, {details.shipping.city}, {details.shipping.state},{details.shipping.country},{details.shipping.zipCode}</p>
  
      <p><b>order date:</b> {new Date(details.createdAt).toLocaleDateString()}</p>
      <button  className='close' onClick={handledetailscancel}> close</button>
      </div>  </div>
  )
  
  }
  
  
    </div>
  );
  
  
  
  
      }
      export default CheckoutSuccess;