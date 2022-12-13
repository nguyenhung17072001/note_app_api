const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Notification = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    //createdAt: { type: Date, default: Date.now },
    //updatedAt: { type: Date, default: Date.now },

}, {
    timestamps: true,
});

module.exports = mongoose.model('Notification', Notification);