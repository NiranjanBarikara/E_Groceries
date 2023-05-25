import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
import Cookies from 'js-cookie';

const Login = () => {
	let navigate = useNavigate();

  //here we can use the data state and update it using setData function 
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //   console.log(data)

  const handleSubmit = async (event) => {
    event.preventDefault();          // prevent page refresh
    // perform any async opation here, like fetching data from an api
    // form submission logic here
    const response = await fetch("http://localhost:8000/api/login_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //json.stringify is a built-in function in js i.e used to convert a js object or value into a json string
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const resData = await response.json();
    // console.log(resData.ticket)
    // console.log("hii");
    // document.cookie=`user:token = ${resData.data};`
   
    if (resData.success) {
    document.cookie=`token=${resData.ticket}`;
      alert("login sucessfully...")
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      console.log("Invalid !!!");
    }

    // if(resData === 'User registered successfully'){
    //     alert("User created successfully.");
    //     // setTimeout(() => {
    //     //     navigate("/users/login");
    //     //   }, 1500);
    // }
  };
//update state or perform some other action based on the new input value
  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  return (
			<div className="login">
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="signup-label">
        Email:
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          className="signup-input"
        />
      </label>
      <label className="signup-label">
        Password:
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          className="signup-input"
        />
      </label>
      <button type="submit" className="signup-button">
        Login
      </button>
    </form>
				</div>
  );
}

export default Login;
