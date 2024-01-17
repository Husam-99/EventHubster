const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateEvent } = require('../middleware');
const events = require('../controllers/events');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(events.index))
    .post(isLoggedIn, upload.array('image'), validateEvent, catchAsync(events.createEvent));

router.get('/new', isLoggedIn, events.renderNewForm);

router.route('/:id')
    .get(catchAsync(events.showEvent))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateEvent, catchAsync(events.updateEvent))
    .delete(isLoggedIn, isAuthor, catchAsync(events.deleteEvent));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(events.renderEditForm));



module.exports = router;