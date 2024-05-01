const User = require('../model/userModel');

const addReview = async (req, res) => {
    const { content } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');

    console.log(user)

    /* if (!user){
        res.status(400);
        throw new Error('user not found');
    } */

    res.json({ user })
}
 
module.exports = { addReview };