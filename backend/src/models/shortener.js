const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortenerSchema = new Schema(
    {
        url: { type: String },
        domain: { type: String },
        code: { type: String }
    }, { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model('shortener', shortenerSchema);