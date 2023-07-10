const userHelper = require("../helpers/userHelper");

//User login verification controller function
const verifyUserlogIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    const response = await userHelper.userLogInVerification(email, password);
    if (response.status) res.status(200).json({ response });
    else res.status(500).json({ response });
  } catch (error) {
    console.log(error);
  }
};

//user Registration Controller Function
const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const response = await userHelper.userRegistration(name, email, password);
    if (response.status) res.status(200).json(response);
    else res.status(500).json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "Something Went wrong" });
  }
};

//User Details to client
const userDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userHelper.userDetails(userId);
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to to get data" });
  }
};

//User Profile image Uploading

const imageDataToDb=async(req,res)=>{
  try{
    const userId=req.body.userId
    const url=req.body.url
    console.log("Image uplaod details",userId,url);
    const response=await userHelper.imageDataTodb(userId,url);
    if (response.status) res.status(200).json(response);
    else res.status(500).json(response);

  }catch(err){
    console.log(err)
  }
}

module.exports = {
  verifyUserlogIn,
  userRegistration,
  userDetails,
  imageDataToDb
};
