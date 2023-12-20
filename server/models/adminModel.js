const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const fixedSalt = process.env.SALT;
const adminSchema = new mongoose.Schema({
   cin:  {
    type: String,
    required: true,
    unique: true,
  },
   password : String, 
});

adminSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('cin')){
        user.cin = await bcrypt.hash(user.cin,fixedSalt);

    }
    if (user.isModified('password')){
        user.password = await bcryot.hash(user.password,fixedSalt);

    }

    next();
});

const AdminUser= mongoose.model('sudo',adminSchema);


module.exports = AdminUser;