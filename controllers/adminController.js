const adminHelper = require("../helpers/adminHelper");

//Admin Login Verification
const verifyAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const response = await adminHelper.verifyAdminCredentials(email, password);
    console.log(response);
    if (response.status) res.status(200).json(response);
    else res.status(500).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Internal error" });
  }
};

//User Details to admin

const fetchUserDetails = async (req, res) => {
  try {
    const usersList = await adminHelper.usersList();
    return res.status(200).json(usersList);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: "Internal server issue" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.query.id;
    console.log(userId);
    const deleteStatus = await adminHelper.deleteUser(userId);
    if (deleteStatus)
      res
        .status(200)
        .json({ status: true, message: "User deletion Successfull" });
    else
      res.status(500).json({ status: false, message: "User deletion failed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "User deletion failed" });
  }
};

//Edit user with user id

const editUser = async (req, res) => {
  try {
    const modifiedInfo = req.body;
    console.log(modifiedInfo);
    const userId = modifiedInfo.userId;
    const updateResponse = await adminHelper.userEdit(userId, modifiedInfo);
    console.log("UpdatedUser", updateResponse);
    if (updateResponse) {
      console.log("If");
      res.status(200).json({ status: true, updateResponse });
    } else {
      console.log("Els4");

      res.status(500).json({ status: false, error: "Failed To Update User" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Internal error" });
  }
};
module.exports = {
  verifyAdmin,
  fetchUserDetails,
  deleteUser,
  editUser,
};
