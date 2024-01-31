const express = require('express'); 
const ErrorHandler = require('./utils/errorHandler');
const connectDb = require('./utils/connectDb'); 
require('dotenv').config(); 
const cors = require('cors'); 
const helmet = require('helmet'); 
const app = express(); 

connectDb(); 

app.use(cors()); 
// app.use(helmet()); 
app.use(express.json()); 

app.get('/', (req, res, next)=>{
	res.json({msg: 'hello'}); 
})

app.use('/api', require('./Routes/files')); 

app.use(ErrorHandler); 

app.listen(process.env.PORT, ()=>{
	console.log(`Backend running on port ${process.env.PORT}`); 
})