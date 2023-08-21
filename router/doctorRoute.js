const express = require('express');
const { DoctorModel } = require('../model/doctorModel');
const DoctorRouter = express.Router();

DoctorRouter.post('/add', async (req, res) => {
    try {
        const newData = await DoctorModel.create({ ...req.body });
        res.status(200).send({ msg: 'New data added' });
    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong', error });
    }
});

DoctorRouter.get('/', async (req, res) => {
    try {
        const allData = await DoctorModel.find();
        res.status(200).send(allData);
    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong', error });
    }
});

DoctorRouter.patch('/edit/:id', async (req, res) => {

    const ID = req.params.id;
    // console.log(ID);

    const payload = req.body;

    try {
        const updateData = await DoctorModel.findByIdAndUpdate({ _id: ID }, payload);

        // console.log(updateData);
        res.status(200).send(updateData);
    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong', error });
    }
});

DoctorRouter.delete('/delete/:id', async (req, res) => {

    const ID = req.params.id;
    // console.log(ID);

    const payload = req.body;

    try {
        const deleteData = await DoctorModel.findByIdAndDelete({ _id: ID });

        // console.log(updateData);
        res.status(200).send(deleteData);
    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong', error });
    }
});



module.exports = { DoctorRouter };