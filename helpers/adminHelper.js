const adminSchema = require("../models/Admin");
const usersSchema = require("../models/Users");
const { generateAccessToken } = require("../middlewares/jwt");

//Admin Verification With JWT generation function
const verifyAdminCredentials = async (email, password) => {
  try {
    const admin = await adminSchema.findOne({
      email: email,
    });

    const isAuthenticated =
      admin.email === email && admin.password === password;
    if (isAuthenticated) {
      const accessToken = generateAccessToken(admin.id);
      //   console.log(isAuthenticated, accessToken);
      return {
        status: true,
        details: admin.name,
        message: "Admin Authenticated successfully",
        accessToken: accessToken,
      };
    } else {
      return {
        status: false,
        details: null,
        message: "Invalid Password",
        accessToken: accessToken,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      details: null,
      message: "Internal server issue",
      accessToken: null,
    };
  }
};

//Complete list of Users With their details

const usersList = async () => {
  try {
    const usersList = await usersSchema.find();
    // console.log(usersList)
    return usersList;
  } catch (error) {}
};

//Delete user using id

const deleteUser = async (userId) => {
  try {
    console.log(userId);
    let result = await usersSchema
      .findByIdAndDelete(userId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Unable to delete with this user Id");
      });
    console.log(result);
    return result;
  } catch (error) {
    console.log(result);
    throw error;
  }
};

//User Details editing with id

const userEdit = async (userId, modifiedProfile) => {
  try {
    let updatedDetails;
    const updatedUser = await usersSchema.findByIdAndUpdate(
      userId,
      modifiedProfile
    );
    // console.log(updatedUser);
    if (updatedUser) {
      updatedDetails = {
        name: updatedUser.name,
        email: updatedUser.email,
      };
    }
    return updatedDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  verifyAdminCredentials,
  usersList,
  deleteUser,
  userEdit,
};
