const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const UserSchema = new Schema(
   {
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'organizer',],
        default: 'user',
    },
   }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;