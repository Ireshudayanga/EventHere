const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JointEventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        time: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
        eventid: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
    }
)

const JointEvent = mongoose.model('JointEvent', JointEventSchema);
module.exports = JointEvent;

