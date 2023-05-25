// DB Connection
const connectToMongo = require('./db')


// Import 
const express =  require('express');
const app = express();
require('dotenv').config();
const  cors = require ('cors')
// const stripe = require("./routes/stripe")
app.use(cors());

// Middleware

// app.use("/api/stripe",stripe);
app.use(express.json());
connectToMongo()
app.get('/', (req, res) =>{
  res.send('Welcome to website')
})

// Routes
app.use('/api', require('./routes/authentication'))
app.use('/api', require('./routes/stripe'))
app.use('/api/', require('./routes/orderdetails'))
// app.use('/api',require('./product'))
// app.use('/api', require('./routes/address'))

// Listening to port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
