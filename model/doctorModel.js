const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
    name: String,
    image: String,
    specialization: String,
    experience: Number,
    location: String,
    date: String,
    slots: Number,
    fee: Number,
});

const DoctorModel = mongoose.model('appointments', DoctorSchema);

module.exports = { DoctorModel };