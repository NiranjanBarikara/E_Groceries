const express = require('express');
const Order = require(  '../models/order.js');
const stripe = require('stripe')('sk_test_51N8LrySH5RO8I4ggc3FiiRNBqSQiIJnOl1jVRuxQI7CsInnAWpAMejAGkzTW1mwsJ6ZagSivQ8kc1MCooA0aoDhJ00EjfX9qMe')


const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
const cartitems = req.body.cart
const address=req.body.address_list
console.log(req.body.address_list)

const id = req .body.userid
  const customer = await stripe.customers.create({
    metadata:{
      userId: id,
      cart:JSON.stringify(cartitems),
      coustmeraddress: JSON.stringify(address)

    },
  });

const line_items = cartitems.map(item=> {
  return{
    price_data: {
      currency: 'INR',
      product_data: {
        name: item.ProductName,
      },
      unit_amount: item.Price * 100,
    },
    quantity: item.Quantity,
  };
 
});

  const session = await stripe.checkout.sessions.create({
 
   customer: customer.id,
   line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });
//  console.log("i am lineee",line_items)
 	res.send({url: session.url });
});

//create Order
const createOrder = async(customer, data) =>{
  const Items = JSON.parse(customer.metadata.cart);
  const details=JSON.parse(customer.metadata.coustmeraddress)
  const newOrder = new Order({
  userId: customer.metadata.userId,
  customerId: data.customer,
  paymentIntentId: data.payment_intent,
  products: Items,
  subtotal: data.amount_subtotal,
  total: data.amount_total,
  shipping: details,
  payment_status:data.payment_status,
  });
  try{
  const savedOrder = await newOrder.save()

console.log("Processed Order:", savedOrder);
// email
  }catch(err){
    console.log(err)
  }
};

// Stripe webhook

let endpointSecret ;

//endpointSecret= 
//"whsec_0630c625cc40e62effbee1a8205e02d7180c4ec76bdc3c7996b1699b71264693";
// whsec_0630c625cc40e62effbee1a8205e02d7180c4ec76bdc3c7996b1699b71264693

router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];


let data;
let eventType;

if(endpointSecret){
  

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("Webhook verified.")
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  data = event.data.object;
  eventType = event.type;
  }else{
data = request.body.data.object;
eventType = request.body.type 
}
  // Handle the event
 if(eventType === "checkout.session.completed"){
stripe.customers.retrieve(data.customer).then((customer) =>{
createOrder(customer, data);
  }).catch((err) => console.log(err.message));
 }


  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});

module.exports = router;