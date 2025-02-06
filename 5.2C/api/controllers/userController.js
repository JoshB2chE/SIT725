const User = require('../models/User');

const getAllUsers = async (_req, res) => {
  const users = await User.find();
  res.render('users', { users });
}

const createUser = async (body) => {
  console.log(body);
  const { name, studentId } = body;
  const user = new User({ name, studentId });
  await user.save();
}

const updateUser = async (body) => {
  const { id, name, studentId } = body;
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  user.name = name;
  user.studentId = studentId;
  await user.save();
}

const deleteUser = async (body) => {
  const { id } = body;
  await User.findByIdAndDelete(id);
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};