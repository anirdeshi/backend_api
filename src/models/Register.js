const mongoose = require('mongoose');

const postschema = mongoose.Schema({

    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    cpass: { type: String, required: true },
    imageUrl: { type: String, required: true }


});

module.exports = mongoose.model('Register', postschema);