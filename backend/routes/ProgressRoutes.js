const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// @route   GET /api/progress/:userId
// @desc    Get user progress or create new if not found
router.get('/:userId', async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.params.userId });

    if (!progress) {
      // If no progress found, create a new document for this user
      progress = new Progress({
        userId: req.params.userId,
        unlockedLevel: 1,
      });
      await progress.save();
    }
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/progress/:userId
// @desc    Update user progress
router.post('/:userId', async (req, res) => {
  const { newUnlockedLevel } = req.body;

  try {
    // Find the user's progress and update it.
    // { new: true } returns the updated document.
    // { upsert: true } creates the document if it doesn't exist.
    const updatedProgress = await Progress.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { unlockedLevel: newUnlockedLevel } },
      { new: true, upsert: true }
    );
    res.json(updatedProgress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;