const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true,
                validate: {
                    validator: function(coords) {
                        return coords.length === 2; 
                    },
                    message: 'Coordinates must contain longitude and latitude.'
                }
            }
        },
        category: {
            type: String,
            required: true,
        },
        signupRequired: {
            type: Boolean,
            required: true,
        },
        organizer: {  
            type: String, // 🔹 Ensure it's stored as a string (or ObjectId if linked to users)
            required: true
        }
    },
);

EventSchema.index({ location: '2dsphere' });

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;  
