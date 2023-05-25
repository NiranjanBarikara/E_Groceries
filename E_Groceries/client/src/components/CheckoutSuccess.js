
import './CheckoutSuccess.css'

const checkout1=() =>{
 const handleorder=()=>{
    window.location.href="/getorder"
 }
 const handleShopping=()=>{
    window.location.href="/addproduct"
 }
 return (
    <div className='success'>
      <h1 className='payment'>payment successfull .</h1>
        <h1>Thank you for your order!</h1>
        <button className='details1' onClick={handleorder}>Details </button>
        <button className='continue' onClick={handleShopping}>Continue Shopping</button>
      
       
    </div>

 )
}
export default checkout1;
