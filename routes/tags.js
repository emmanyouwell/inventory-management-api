const express = require('express');
const { createTag, getAllTags, getTagById, updateTag, deleteTag } = require('../controllers/tagController');
const router = express.Router();


router.route('/tags')
    .post(createTag)
    .get(getAllTags)

router.route('/tags/:id')
    .get(getTagById)
    .patch(updateTag)
    .delete(deleteTag)

module.exports = router;