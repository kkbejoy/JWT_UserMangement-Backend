const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
  image: {
    type: String,
}
});

// Don't expose password and other variables via API endpoints
userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, opt) => {
    delete ret["password"];
    return ret;
  },
});

//Before saving new user, hash password

userSchema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  this.password = hash;
  next();
});

//Check if password is valid or not

userSchema.method.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", userSchema);

//  const user = new userCon({
//         email: 'kkbejo1y@ymail.com',
//         password: '123',
//         name: 'Bejoy',
//         // phone:'9400822788'
//       });

//       user.save().then((user)=>{
//         console.log('user added successfully')
//       })
//       .catch((error)=>{
//         console.log(error);
//       });
