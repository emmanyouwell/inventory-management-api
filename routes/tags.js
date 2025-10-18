const express = require('express');
const { createTag, getAllTags } = require('../controllers/tagController');
const router = express.Router();


router.route('/tags')
.post(createTag)
.get(getAllTags)


module.exports = router;