const mongoose = require('mongoose');

const electionModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    startTime: {
        type: Date,
        required: true,
        unique:true
    },
    endTime: {
        type: Date,
        required: true,
        unique:true
    },
    electionType: {
        type: String,
        required: true
    }
});

const ElectionModel = mongoose.model('election', electionModel);

module.exports = ElectionModel;
