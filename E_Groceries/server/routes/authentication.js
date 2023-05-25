const express =  require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_RANDON_STAR ="hellohello"
const allverifytoken = require("../middleware/authmiddleware");
const Users = require("../models/Users");
const Address = require('../models/addrschema');
const Product = require('../models/product_schema');

// Route1
// SignUp Form
router.post(
  "/create_user",
  [
    // Data Validation
    body(
      "firstName",
      "Enter a Valid first name min length required 3"
    ).isLength(3),
    body("lastName", "Last name cannot be empty").isLength(1),
    body("email", "Enter a Valid Email id").isEmail(),
    body("password", "Enter a Valid password min length required 5").isLength({
      min: 5,
    }),
    body(
      "phoneNumber",
      "Enter a Valid Phone Number length should be 10"
    ).isLength({ min: 10, max: 10 }),
  ],
  async (req, res) => {
    // If errors, return bad req and errors (Email Id Unique)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Destructing
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    try {
      // Check user exists or not
      let user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "Enter a unique Email Id" });
      }
      //   hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      // Create user
      user = await Users.create({
        firstName,
        lastName,
        password: hashPassword,
        email,
        phoneNumber,
      });
      res.json({success:true, user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Route 2
// Login
router.post(
  "/login_user",
  // Data Validations
  [
    body("email", "Enter a Valid Email id").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false
    // If errors, return bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Destructing
    const { email, password } = req.body;

    try {
      let user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login using correct credentials !!!" });
      }
      // Compare password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            error: "Please try to login using correct credentials !!!",
          });
          
      }
      const data = {
        user: {
          id: user._id,
        },
      };
      const token = jwt.sign(data,JWT_RANDON_STAR,{expiresIn:'20h'});
      success = true
      res.json({ success, ticket:token });
      // return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
// route 3 getuser details
router.get("/getuser",
allverifytoken,
async(req, res) => {

try{
    
    const user= await Users.findById({_id:req.userId})
   if(!user){
    return res.status(400)
   }
    console.log(user)
    res.send(user)

}
catch(errors)
{
    res.status(400).send({errors:"some internal server error"})
}
}
)




// get useraddress details
router.get('/getaddress', allverifytoken, async (req, res) => {
    try {
      const userAddresses = await Address.find({ userId: req.userId });
      if (!userAddresses || userAddresses.length === 0) {
        return res.status(404).json({ message: 'User addresses not found' });
      }
      // console.log("user id:", req.userId);
      res.status(200).json({ addresses: userAddresses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });





  
//  add address entry
    router.post('/addaddress', allverifytoken, async (req, res) => {
    try {
      // Check if all required fields are present
       const { houseNumber, street, city, state, country, zipCode } = req.body;
      if (!houseNumber || !street || !city || !state || !country || !zipCode) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  console.log("user id:", req.id);
      const userAddress = new Address({
        userId: req.userId,
        houseNumber: houseNumber,
        street: street,
        city: city,
        state: state,
        country: country,
        zipCode: zipCode
      });
  
      const existingAddress = await Address.findOne({
        userId: req.id,
        houseNumber: req.body.houseNumber,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zipCode: req.body.zipCode
      });
    
      
      if (existingAddress) {
        return res.status(400).json({ message: 'Address already exists' });
      }
      
      const savedAddress = await userAddress.save();
      res.status(201).json({ address: savedAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

//get products
router.get('/getproduct',
async (req, res) => {
try{
  const userentry= await Product.find({})
  res.send(userentry)
}
catch(error) {
  console.log(error);
}
})

//delete address 
router.delete('/deleteaddress/:addressid', allverifytoken, async (req, res) => {
  try {
    const deletedAddress = await Address.findOneAndDelete({addressid: req.params._id, userId: req.userId});
      // Find the address to delete by ID and user ID
      // {  req.params.addressid, userId: req.id } 

console.log(deletedAddress);
    if (!deletedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
