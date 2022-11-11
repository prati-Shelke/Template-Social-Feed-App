const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const {
  authService,
  userService,
  tokenService,
  emailService
} = require('../services');


const register = catchAsync(async (req, res) =>
{
  // const org = await userService.createOrg(req.body);
  let user;
  try 
  {
      user = await userService.createUser({
        // _org: org._id,
        ...req.body
      });
  } catch (e) {
    // await org.remove();
    throw e;
  }
  // user = await user.populate("_org", "name email");
  const {
    token,
    expires
  } = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    user,
    token,
    expires
  });
});

const login = catchAsync(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const {
    token,
    expires
  } = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    token,
    expires
  });
});


const googleLogin = catchAsync(async (req, res) => 
{
  console.log("first")
  const user = await authService.loginWithGoogle(req.body);
  console.log("google user", user);
  const { token, expires } = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    token,
    expires,
  });
});


const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(200).send({token:resetPasswordToken});
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const self = catchAsync(async (req, res) => {
  res.send(req.user);
});

//------------------------------------TO CHANGE PASSWORD--------------------------
const changepassword = async (req, res) => {
  if (bcrypt.compareSync(req.body.oldPassword, req.user.password)) 
  {
    if (req.body.newPassword === req.body.confirmPassword)
    {
      let user = await authService.updatedPassword(
        req.user.id,
        req.body.newPassword
      );
      // let user = await User.findOne({ _id: current_user._id });
      // console.log(user);
      // let token = getSignedToken(user);
      return res.status(httpStatus.OK).send({message:"password updated successfully"});
    }
    else
    {
      return res.status(httpStatus.BAD_REQUEST).send({message:"new password and confirm password does not match"});
    }
  } 
  else 
  {
    return res.status(httpStatus.BAD_REQUEST).send({message:"old password does not match"});
  }
}

module.exports = {
  register,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  self,
  changepassword
};