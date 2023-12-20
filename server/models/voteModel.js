
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  vote_ID: {
    type: String,
    required: true,
    unique: true,
  },
 
  candidate_id: {
    type: String,
    required: true,
  },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
