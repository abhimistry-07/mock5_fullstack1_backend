const mongoose = require("mongoose");
const express = require('express');
const { UserRouter } = require("./router/userRouter");
const app = express();
const cors = require('cors');
const { connection } = require("./db");
const { DoctorRouter } = require("./router/doctorRoute");
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('HomePage');
});

app.use('/users', UserRouter);
app.use('/doctors', DoctorRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log('Db connected');
    } catch (error) {
        console.log(error);
    }
    console.log(`Listening to port ${process.env.PORT}`);
});