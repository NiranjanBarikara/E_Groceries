import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link , useNavigate  } from 'react-router-dom'
import './Profile.css';
import axios from 'axios'

const Profile = () => {
  const [allverifytoken1, setallverifytoken1] = useState("");
  console.log(allverifytoken1)
  const token = Cookies.get('token');
		console.log(token)

  useEffect(() => {
    const allverifytoken2 = async () => {
      try{     
        const response = await fetch('http://localhost:8000/api/getuser', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth": token,
        }
        });
        // console.log(response)
        const data = await response.json();
        console.log(data)
        setallverifytoken1(data);
        // console.log(response)
        // setallverifytoken1(response.data);
    } catch(error){
    console.log("error in response");
    }

  };    
    allverifytoken2()
},[]);
   

// From here
const [addressList, setAddressList] = useState([]);
const [success, setSuccess] = useState({});
useEffect(() => {
  const fetchAddressData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/getaddress', {
        method: 'GET',
        headers: { 'auth': token },
      });
      const result = await response.json();
      console.log(result);
      setAddressList(result)
      setSuccess(true)
    } catch (error) {
      console.log('error in response');
    }
  };
  fetchAddressData();
}, []);

const handleDelete = async (addressid) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/deleteaddress/${addressid}`, {
      headers: { auth: token },
    });
    const resData = await response.json();
    console.log(resData);
  } catch (error) {
    console.log('error in response');
  }
};


  return (
    <>
     {/* <div className="hhh">
        <nav className="navbar">
          <div className="navbar-left">
              <img
                alt="Logo"
                className="logo"
              />
          </div>
          <div className="navbar-middle">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div> */}
        <div className="profile-card">
       
          <div className="profile-info">
										<h1 className="profile-name"> firstName:{allverifytoken1.firstName} </h1>
          <h1 className="profile-name"> lastName:{allverifytoken1.lastName} </h1>
            <h2 className="profile-name">Email : {allverifytoken1.email}</h2>
          </div>
          {/* <br></br> <br></br> */}

          {/* From here write address html part */}
          <form className='form2'>
          {success && (
            <div>
              <table>
                <thead>
                  <tr>
                  <th>houseNumber</th>
                    {/* <th>Address</th> */}
                    <th>street</th>
                    <th>city</th>
                    <th>state</th>
                    <th>country</th>
                    <th>zipCode</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {addressList && addressList.addresses && addressList.addresses.map((address, index) => (
                    <tr key={index}>
                      <td>{address.houseNumber}</td>
                      {/* <th>{address.Address}</th> */}
                      <td>{address.street}</td>
                      <td>{address.city}</td>
                      <td>{address.state}</td>
                      <td>{address.country}</td>
                      <td>{address.zipCode}</td>
                      <td>
                    {/* <button onClick={() => handleDelete(address._id)}>Delete</button>
                     */}
                     <button   onClick={() => handleDelete(address._id)}>Delete</button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='btn'>
  <Link to ='/addaddress'>
    <button >ADD ADDRESS</button>
  </Link>
</div>
            </div>
          )}
          </form>
   

        </div>
   
    </>
  );
};

export default Profile;