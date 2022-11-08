const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const bcrypt = require('bcrypt')

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    position: { type: String, required: true },
    avatar: { type: String, maxLength: 225 },
    name: { type: String, required: true  },
    
    //createdAt: { type: Date, default: Date.now },
    //updatedAt: { type: Date, default: Date.now },

}, {
    timestamps: true,
});

User.methods.encryptPassword= (password)=> {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

User.methods.validPassword = (password)=> {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', User);