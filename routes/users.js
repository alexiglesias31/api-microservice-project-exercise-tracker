const router = require('express').Router()
const User = require('../models/user')

router.route('/api/users').post(async (req,res) => {
    const username = req.body.username

    const userDb = await User.findOne({username: username})
    if(userDb) res.send('Username already taken')

    const newUser = new User({username: username})
    const user = await newUser.save()
    res.json({
        username: user.username,
        _id: user._id
    })
})

module.exports = router