
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp.js';
import Login from './components/Login/Login.js';
import Navbar from './components/Navbar';
import Address from './components/addaddress';
import Profile from'./components/Login/Profile/Profile';
import Product from'./components/Product/product';
import Cart from './components/Cart/Cart.js';
import Homepage from'./components/Login/Homepage/homepage';
import CheckOutSuccess from './components/CheckoutSuccess';
import cancel from './components/cancel';
import Cancelpage from './components/cancel';
import CheckoutSuccess from './components/orderdetails';


function App() {
  return (
   <>
   <BrowserRouter>
   <Navbar />
        <Routes>
        
        <Route exact path="/SignUp" element={<SignUp/>} />
        {/* <Route exact path="/" element={<Navbar />} /> */}
        
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/getuser' element={<Profile/>}/>
      <Route exact path='/' element={<Homepage/>}/>

      <Route exact path='/addaddress' element={<Address/>}/>
      <Route exact path='/addproduct' element={<Product/>}/>
      <Route exact path='/Cart' element={<Cart/>}/>
      <Route exact path='/success' element={<CheckOutSuccess/>}/>
      <Route exact path='/cancel' element={<Cancelpage/>}/>
      <Route exact path='/getorder' element={<CheckoutSuccess/>}/>
      

        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
