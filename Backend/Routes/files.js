const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Files = require('../Model/File');
const { v4: uuid4 } = require('uuid');
const API_ERROR = require('../utils/api-error');
const util = require('util');

let storage = multer.diskStorage({
	destination: (req, file, callback) => callback(null, './Uploads/'),
	filename: (req, file, callback) => {
		const uniqueName = `${Date.now()}-${file.originalname}`;
		callback(null, uniqueName);
	}
})

// Promisify the multer middleware
const upload = util.promisify(multer({
	storage,
	limits: {
		fileSize: 1E6 * 100 // 100mb limit of file
	}
}).single('myfile'));

router.post('/uploadfile', async (req, res, next) => {
	try {
		// await the upload promise
		await upload(req, res);

		// validate request 
		if (!req.file) {
			throw new API_ERROR(400, 'File is required');
		}

		// store data of file in mongodb 
		const file = await Files.create({
			filename: req.file.filename,
			uuid: uuid4(),
			path: req.file.path,
			size: req.file.size,
		});

		return res.json({ file: file.uuid });
	} catch (error) {
		next(error);
	}
});

module.exports = router;