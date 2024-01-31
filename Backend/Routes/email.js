const API_ERROR = require('../utils/api-error');
const Files = require('../Model/File'); 
const sendEmail = require('../Services/emailService');

const router = require('express').Router();

router.post('/send', async(req, res, next) => {
	try {

		const { uuid, emailto, emailFrom } = req.body;
		if (!uuid || !emailto || !emailFrom) {
			throw new API_ERROR(400, 'Required fields are not provided');
		}

		const file = await Files.findOne({ uuid: req.params.uuid });
		if (!file) {
			throw new API_ERROR(400, 'Upload file before proceeding');
		}

		file.sender = emailFrom; 
		file.reciever = emailto; 

		await file.save(); 

		sendEmail(emailFrom, emailto, 'FILE SHARED THROUGH FILEFLOW', require('../Services/htmlTemplate')(emailFrom, `${process.env.APP_BASE_URL}/api/recieve/download/${file.uuid}`, parseInt(file.size/1000) + 'KB', '24 Hours')); 

	} catch (error) {
		next(error)
	}
})

module.exports = router; 