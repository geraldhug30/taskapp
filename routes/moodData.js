const express = require('express');
const { check, validationResult } = require('express-validator');
const Moods = require('../models/Mood_Data');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('working');
});

// @route   Post /api/mood
// @desc    Store data to database
// @access  Public

router.post(
  '/',
  [
    check('employeeID')
      .isNumeric()
      .notEmpty()
      .withMessage('Employee ID is required!'),
    check('moodMeter')
      .isNumeric()
      .notEmpty()
      .withMessage('Please insert a mood meter'),
    check('workShifts')
      .notEmpty()
      .trim()
      .withMessage('Work shift is required!'),
    check('reviewersReason').trim().escape(),
    check('ownWordReason').escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ msg: errors });
    }

    try {
      let mood = await new Moods(req.body);

      mood.save();
      return res.status(201).json(mood);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
