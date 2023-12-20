const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {encrypt} = require('../tools/cryptoUtils');
const fixedSalt = process.env.SALT;
const userSchema = new mongoose.Schema({
  cardNumber:  {
    type: String,
    required: true,
    unique: true,
  },
  birth:  {
    type: String,
    required: true,
  },
  fingerprint:  {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  user_name:{
    type:String,
    required:true,
  },
  voted:{
    type:String,
    default:"no"
  }
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('cardNumber')) {
    user.cardNumber = await bcrypt.hash(user.cardNumber, fixedSalt);
  }

  if (user.isModified('birth')) {
    user.birth = await bcrypt.hash(user.birth, fixedSalt);
  }

  if (user.isModified('fingerprint')) {
    user.fingerprint = await bcrypt.hash(user.fingerprint, fixedSalt);
  }

  if (user.isModified('code')) {
    user.code = await bcrypt.hash(user.code, fixedSalt);
  }
  if(user.isModified('user_name')){
 user.user_name=encrypt(this.user_name);
  }

  next();
});

userSchema.methods.markVoted = function () {
  this.voted = 'yes';
};

userSchema.statics.findByCardNumber = async function (cardNumber) {
  return this.findOne({ cardNumber: cardNumber });
};
const User = mongoose.model('users', userSchema);

module.exports = User;
