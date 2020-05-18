const express = require('express');
const router = express.Router();

const controller = require('../controllers/advertisement');

const upload = require('../helpers/uploader');

//api/advertisement
router.get('/', controller.getAllAds);
router.get('/:size', controller.getAdsBySize);
router.post('/', upload.single('file'), controller.createAd);
router.delete('/:id', controller.deleteAd);

module.exports = router;