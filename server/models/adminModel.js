const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const fixedSalt = process.env.SALT;

const adminSchema = new mongoose.Schema({
   cin:  {
    type: String,
    required: true,
    unique:true,
   
  },
   password :  {
    type: String,
    required: true,
    
  }, 
});

adminSchema.pre('save',async function(next){
  console.log('salt in Model:'+fixedSalt);
    const user = this;
    
    if(user.isModified('cin')){

        user.cin = await bcrypt.hash(user.cin.toString(),fixedSalt);
console.log('hached cin Model:'+user.cin);
    }
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password.toString(),fixedSalt);

    }

    next();
});

const AdminUser= mongoose.model('sudos',adminSchema,'sudos');


module.exports = AdminUser;