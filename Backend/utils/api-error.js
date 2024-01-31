class API_ERROR extends Error{
	constructor(statusCode, description)
	{
		super(description); 
		this.statusCode = statusCode; 
	}	
}

module.exports = API_ERROR; 