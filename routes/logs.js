const router = require('express').Router()
const User = require('../models/user')
const Exercise = require('../models/exercise')

router.route('/api/users/:_id/logs?').get(async (req,res) => {
    const exercises = await Exercise.find({
        userId: req.params._id,
        date: {
            $gte: req.query.from ? new Date(req.query.from) : new Date(0),
            $lt: req.query.to ? new Date(req.query.to) : new Date(8640000000000000),
        }
    }).limit(req.query.limit ? parseInt(req.query.limit) : 0)
    const user = await User.findById(req.params._id)
    res.json({
        id: req.params._id,
        username: user.username,
        count: exercises.length,
        log: exercises
    })
})

module.exports = router