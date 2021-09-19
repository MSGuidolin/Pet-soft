import { Schema, model } from 'mongoose';

const CalendarSchema = new Schema(
    {
        eventsHours: {
            type: Array, // ['15:00', '14:00']
            required: true,
        },
        provider: {
            type: Schema.Types.ObjectId,
            ref: 'Providers',
            autopopulate: true,
        },
        events: [{
            type: Schema.Types.ObjectId,
            ref: 'Events',
            autopopulate: true,
        }]
    },
    { versionKey: false, timestamps: true }
);
CalendarSchema.plugin(require('mongoose-autopopulate'));
export default model('Calendar', CalendarSchema);