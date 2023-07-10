const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("admin", adminSchema);

// const admin = new adminModel({
//             email: 'kkbejo1y@ymail.com',
//             password: '123',
//             name: 'Bejoy',
//             // phone:'9400822788'
//           });

//           admin.save().then((user)=>{
//             console.log('user added successfully')
//           })
//           .catch((error)=>{
//             console.log(error);
//           });
