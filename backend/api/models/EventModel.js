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
        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

EventSchema.index({ location: '2dsphere' });

const Events = mongoose.model('Event', EventSchema);
module.exports = Events
