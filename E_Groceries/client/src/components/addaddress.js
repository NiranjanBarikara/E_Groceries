import React,{useState}from "react";
// import Axios from'axios';
import "./Address.css";
import { Link  } from 'react-router-dom'
import Cookies from 'js-cookie';
//import Navbar from '../nav/nav';

// The component is exported as a default function called Address. It imports and uses the 
// useState hook to create state variables for the different fields required to add an
export default function Address(){
    const [houseNumber, sethouseNumber]=useState('');
    const[city,setCity]=useState('');
    const[street,setStreet]=useState('');
    // const[Address,setAddress]=useState('');
    const[state,setState]=useState('');
    const[country,setCountry]=useState('');
    const[zipCode,setzipCode]=useState('');
    const[success,setSuccess]=useState(false);
    const [unsuccess,setUnsuccess]=useState(false);
    const token=Cookies.get('token')
    console.log(token)
    const handlesubmit=async(e)=>{
        e.preventDefault();
        // console.log(email);
        try{
          const response = await fetch("http://localhost:8000/api/addaddress",{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        "auth": token,
      },
      body: JSON.stringify({       //method is used to convert a JavaScript object into a JSON  string
        // userId: req.id,
        houseNumber: houseNumber,
        // Address:Address,
        street: street,
        city: city,
        state: state,
        country: country,
        zipCode: zipCode
      })
    
    });
            
            console.log(response)
            if (response!==400){
                setSuccess(true);
                setUnsuccess(false);
                setTimeout(()=>{
                    window.location.href='/getuser';//replace '/home' with my home page url
                },2000)
            }
            
            
        }
        catch(errors){
            console.log("error");
            setSuccess(false);
            setUnsuccess(true);
           
        }
    }
   //onchange is a input that triggered when the value of the input is changed by user.
  return (
    <div className="homeaddress">
              {/* <nav className="navbar">
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
        </nav> */}

      <div className='auth-form-container'>
        <form className='Address form' onSubmit={handlesubmit}>
         <label htmlFor='houseNumber'>HouseNumber</label>
         <input value={houseNumber} name="houseNumber"  onChange={(e)=> sethouseNumber(e.target.value)}id="houseNumber" placeholder='houseNumber'/>
         <label htmlFor='street'>Street</label>
         <input value={street} name="street" onChange={(e)=> setStreet(e.target.value)} id="street" placeholder='street'/>
         <label htmlFor='city'>City</label>
         {/* <input value={Address} name="Address" onChange={(e)=> setAddress(e.target.value)} id="Address" placeholder='Address'/>
         <label htmlFor='Address'>Address</label> */}
         <input value={city} name="city" onChange={(e)=> setCity(e.target.value)} id="city" placeholder='city'/>
         <label htmlFor='state'>State</label>
         <input value={state} type="state" onChange={(e)=> setState(e.target.value)} id="state" placeholder='state'/>
         <label htmlFor='country'>Country</label>
         <input value={country} type="country" onChange={(e)=> setCountry(e.target.value)} id="country" placeholder='country'/>
         <label htmlFor='zipCode'>ZipCode</label>
         <input value={zipCode} type="zipCode" onChange={(e)=> setzipCode(e.target.value)} id="zipCode" placeholder='zipCode'/>
         <button type="ADDADDRESS" > <Link to ="/Address"></Link>ADD ADDRESS</button>
         {/*these two lines of code are rendering the success and error message on the page  */}
          {success && <b>Address updated successfully.</b>}
          {unsuccess && <b>Failed to update address.</b>}
       
        </form>
        {/* <Navbar /> */}
      </div>
      
      </div>
  )
}