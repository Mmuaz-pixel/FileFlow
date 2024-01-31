const router = require('express').Router();
const Files = require('../Model/File');
const API_ERROR = require('../utils/api-error');

router.get('/info/:uuid', async (req, res, next) => {
	try {

		const file = await Files.findOne({ uuid: req.params.uuid });
		if (!file) {
			throw new API_ERROR(400, 'Invalid link');
		}

		return res.json({ uuid: file.uuid, filename: file.filename, size: file.size })
	} catch (error) {
		next(error);
	}
})

router.get('/download/:uuid', async (req, res, next) => {
	try {

		const file = await Files.findOne({ uuid: req.params.uuid });
		if (!file) {
			throw new API_ERROR(400, 'Invalid link');
		}
		const filePath = `${__dirname}/../${file.path}`; 
		return res.download(filePath); 
	} catch (error) {
		next(error);
	}
})

module.exports = router; 