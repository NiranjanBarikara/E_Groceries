import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import Cookies from 'js-cookie';

const Navbar = () => {


  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const token = Cookies.get('token');
  useEffect(() => {
    
    console.log(token)
    if (token) {
      // Verify the token with the server here
      // If the token is valid, setLoggedIn(true);
      console.log("hiii")
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

 function handleLogout () {
    // navigate('/'); 
    console.log("i am in the handleLogout")
    console.log(token)
    Cookies.remove('token', { path: "/",domain: 'localhost'});

    setLoggedIn(false);
  }



    function sayHello() {
      alert('Hello!');
    }
    

  return (
    <>
      <div className="hhh">
        <nav className="navbar">
          <div className="navbar-left">
              <img
                src={require('./images/logo-png.png')}
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
                <Link to="/addproduct" className="nav-link">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div className="buttons">
            {loggedIn ? (
              <>
              <Link  role='button' to="/getuser">
                  <button className="btn1">
                                            Profile
                                        </button>
                                        </Link>
                                        <Link  to="/">
                <button className="btn1 " onClick={handleLogout}>
                  Logout
                </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="./signup">
                  <button className="btn2">
                    Sign Up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="btn2 " >
                    Log In
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;


