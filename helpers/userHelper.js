const usersModel = require("../models/Users");
const { generateAccessToken } = require("../middlewares/jwt");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userRegistration = async (name, email, password) => {
  try {
    const user = await usersModel
      .findOne({
        email: email,
      })
      .lean();
    console.log("user reg res from DB", user);
    if (user) {
      return {
        status: false,
        details: null,
        message: "User with this email already exists!!!",
      };
    }
    if (!user) {
      await usersModel.create({
        name: name,
        email: email,
        password: password,
      });
      return { status: "true", message: "User created successfully" };
    } else {
      throw new Error("Something Went wrong");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const userLogInVerification = async (email, password) => {
  try {
    // console.log(email, password);
    const user = await usersModel.findOne({
      email: email,
    });
    if (!user) {
      return {
        status: false,
        details: null,
        message: "No user with this email!!!",
      };
    }
    const passwordVerification = await bcrypt.compare(password, user.password);
    const isAuthenticated = user.email === email && passwordVerification;
    // console.log(isAuthenticated, accessToken);
    if (isAuthenticated) {
      const accessToken = generateAccessToken(user.id);
      console.log(isAuthenticated, accessToken);
      return {
        status: true,
        details: user,
        message: "User Authenticated successfully",
        accessToken: accessToken,
      };
    }

    return {
      status: false,
      details: null,
      message: "User Authenticated Failed",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      details: null,
      message: "Somthing Went wrong!!!",
    };
  }
};

//user Details with user Id

const userDetails = async (userId) => {
  try {
    console.log("userId", userId);
    const user = await usersModel.findById(userId);
    if (user) {
      return {
        status: true,
        userDetails: user,
        message: "user Details fetched successfully",
      };
    } else {
      return {
        status: false,
        user: null,
        message: "Failed to Fetch user details",
      };
    }
  } catch (err) {
    console.log(error);
    return {
      status: false,
      userDetails: null,
      message: "Failed to retrieve data, try again",
    };
  }
};


//Image data to Db
const imageDataTodb=async(userId,imageUrl)=>{
try{
const user=await usersModel.findByIdAndUpdate(userId, { image: imageUrl }, { new: true });
console.log("user", user);

if(user){
  return {status:true,user};
}
else return {status:false}
}catch(error){
throw error;
}
}

module.exports = {
  userLogInVerification,
  userRegistration,
  userDetails,
  imageDataTodb
};
