const User = require('../models/User');

const getAllUsers = async () => {
  const users = await User.find();
  return users; // Return all users
}

const createUser = async (body) => {
  const { name, studentId } = body;
  if (!name || !studentId) throw new Error('Missing fields');

  const user = new User({ name, studentId });
  await user.save();  
  return user; // Return the created user
}

const updateUser = async (id, body) => {
  const { name, studentId } = body;
  if (!name || !studentId) throw new Error('Missing fields');

  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  
  user.name = name;
  user.studentId = studentId;
  await user.save();
  return user; // Return the updated user
}

const deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  
  await User.findByIdAndDelete(id);
  return; // Return nothing
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};