const express = require('express'); 
const ErrorHandler = require('./utils/errorHandler');
require('dotenv').config(); 
const app = express(); 

app.get('/', (req, res, next)=>{
	res.json({msg: 'Under production'}); 
	next(); 
})

app.use(ErrorHandler); 

app.listen(process.env.PORT, ()=>{
	console.log(`Backend running on port ${process.env.PORT}`); 
})