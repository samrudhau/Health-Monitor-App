const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true},
    password: { type: String, required: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    password: { type: String, required: true},
    securityQuestion: { type: String, required: true},
    securityAnswer: { type: String, required: true},

    userData: {
        date: [],
        activity: [],
        weight: [],
        minutes: [],
        BodyTemp: [],
        HeartRate: [],
    }
})

module.exports = mongoose.model('User', userSchema);