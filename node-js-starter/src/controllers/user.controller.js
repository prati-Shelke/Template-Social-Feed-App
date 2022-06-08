const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {
  userService
} = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser({
    _org: req.user._org,
    ...req.body
  });
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, {
    ...options,
    populate: [{
      path: "_org",
      select: "_id name email"
    }]
  });
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await (await userService.getUserById(req.params.userId))
    .populate("_org", "_id name email");
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(req.user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await (await userService.updateUserById(req.params.userId, req.body))
    .populate("_org", "_id name email");
  res.send(user);
});

const updateOrg = catchAsync(async (req, res) => {
  const org = await userService.updateOrgById(req.params.orgId, req.body);
  res.send(org);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

//------------------------------------------TO UPDATE PROFILE--------------------------------------
const editProfile = catchAsync(async(req,res) => {
  console.log(req.file)
  let user = await userService.editProfileById(req.user.id , req.body , req.file)
  res.status(httpStatus.OK).send({message:"user updated successfully",user})
})

//-----------------------------------------TO GET BOOKMARKED POST---------------------------------------
const getbookmarkedPost = catchAsync(async(req,res) =>
{
    // console.log("u:")
    let user = await userService.getbookmarkedPost(req.user.id)
    res.status(httpStatus.OK).send(user);
})

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateOrg,
  editProfile,
  getbookmarkedPost
  
};
