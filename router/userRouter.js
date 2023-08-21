const express = require('express');
const UserRouter = express.Router();
const bcrypt = require('bcrypt');
const { UserModel } = require('../model/userModel');

UserRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);

    try {
        const newPass = await bcrypt.hash(password, 5);
        const newData = await UserModel.create({ ...req.body, password: newPass });
        // console.log(newPass, "nepass");

        return res.status(200).send(newData);

    } catch (error) {
        return res.status(400).send(error)
    }
});

UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;


    // console.log(user);

    try {
        const user = await UserModel.findOne({ email });

        const verify = await bcrypt.compare(password, user.password);

        console.log(user);

        if (!user) {
            return res.status(200).send({ msg: 'Please signup' });
        }

        if (!verify) {
            return res.status(200).send({ msg: 'Invalid password' })
        }

        res.status(200).send(user);

    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong' }, error)
    }
})

module.exports = { UserRouter };
