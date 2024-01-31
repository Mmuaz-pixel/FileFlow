const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Files = require('../Model/File');
const { v4: uuid4 } = require('uuid');

let storage = multer.diskStorage({
	destination: (req, file, callback) => callback(null, './Uploads/'),

	filename: (req, file, callback) => {
		const uniqueName = `${Date.now()}-${Math.round(Math.random() * 150)}${path.extname(file.originalname)}`

		// path.extname gives name of extension of file e.g., png, jpg 

		callback(null, uniqueName);
	}
})

let upload = multer({
	storage,
	limits: {
		fileSize: 1E6 * 100 // 100mb limit  of file 
	}
}).single('myfile');

router.post('/uploadfiles', async (req, res, next) => {
	try {
		// validate request 
		if (!req.file) {
			throw new Error('File is required');
		}

		// store file in local storage 
		upload(req, res, async (err) => {
			if (err) {
				throw new Error("Failed uploading file");
			}

			// store data of file in mongodb 

			const file = await Files.create({
				filename: req.file.filename,
				uuid: uuid4(),
				path: req.file.path,
				size: req.file.size,

			})

			return res.json({ file: `${process.env.APP_BASE_URL}/files/${file.uuid}` })
		})

	}
	catch (error) {
		next(error);
	}
})

module.exports = router; 