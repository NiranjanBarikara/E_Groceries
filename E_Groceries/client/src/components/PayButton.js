import axios from "axios";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { database } from "faker/lib/locales/en";
// import {useSelector} from "react-redux";
// import {url} from "../slices/api"

const PayButton = ({cartitems , address_list}) => {

	const [userid, setuserid] = useState("");
 
  const token = Cookies.get('token');

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
						// console.log(data._id)
						setuserid(data._id);
						// console.log(response)
						// setallverifytoken1(response.data);
		} catch(error){
		console.log("error in response");
		}
	};    
	allverifytoken2()
},[]);



// console.log(cartitems);
const cart =  cartitems.map(data =>( {
	_id:data._id,
	ProductName:data.ProductName,
category:data.category,
Price:data.Price,
Quantity:data.Quantity

}))
console.log(cart)
// const formatteditems = ()

    const handleCheckout = () =>{
					axios.post("http://localhost:8000/api/create-checkout-session",{
						cart,
						userid,
						address_list,
      
					}).then((res)=>{
						if(res.data.url){
							window.location.href = res.data.url
						}
					}).catch((err)=> console.log(err.message))
				};
	  	return (
									<>
									<button onClick={() => handleCheckout()}>check Out</button>
									</>
								);
}

export default PayButton;