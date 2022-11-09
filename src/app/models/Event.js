const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Event = new Schema({
    eventName: { type: String, required: true },
    name: { type: String, required: true  },
    position: { type: String, required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    userId: { type: String,  required: true}
    //createdAt: { type: Date, default: Date.now },
    //updatedAt: { type: Date, default: Date.now },

}, {
    timestamps: true,
});

module.exports = mongoose.model('Event', Event);