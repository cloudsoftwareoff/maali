const mongoose = require('mongoose');

const electionModel = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique:true
    }
    ,
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

// Static method to get the current active election id and type
electionModel.statics.getCurrentActiveElectionData = async function () {
    const currentDate = new Date();
    const activeElection = await this.findOne({
        startTime: { $lt: currentDate },
        endTime: { $gt: currentDate }
    });

    return activeElection ? { id: activeElection.id, electionType: activeElection.electionType } : null;
};


const ElectionModel = mongoose.model('election', electionModel);

module.exports = ElectionModel;
