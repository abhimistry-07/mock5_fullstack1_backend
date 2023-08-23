const express = require('express');
const UserRouter = express.Router();
const bcrypt = require('bcrypt');
const { UserModel } = require('../model/userModel');
const jwt = require('jsonwebtoken')

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

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(200).send({ msg: 'Please signup' });
        }

        const verify = await bcrypt.compare(password, user.password);

        if (!verify) {
            return res.status(200).send({ msg: 'Invalid password' })
        }

        const token = jwt.sign({ userId: user._id }, 'secretPass', { expiresIn: "1d" });

        // console.log(token,'token');
        // localStorage.setItem('token', token);

        res.status(200).send({ token, user });

    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong' }, error)
    }
})

module.exports = { UserRouter };
