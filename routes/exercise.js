const router = require('express').Router()
const Exercise = require('../models/exercise')
const User = require('../models/user')

router.route('/api/users/:_id/exercises').post(async (req,res) => {
    const newExercise = new Exercise({
        userId: req.params._id,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date ? new Date(req.body.date) : new Date()
    })
    const exercise = await newExercise.save()
    const user = await User.findById(exercise.userId)
    res.json({
        _id: exercise.userId,
        username: user.username,
        date: exercise.date.toDateString(),
        duration: exercise.duration,
        description: exercise.description
    })
})

module.exports = router