import User from '../models/user.model.js'
import bcrypt from "bcryptjs"


export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // Check if the user is trying to update their own profile
    if (user._id.toString() !== req.user._id.toString()) {
      const error = new Error('Not authorized to update this profile');
      error.statusCode = 403;
      throw error;
    }

    // Create update object
    const updateData = {};

    // Add name to update if provided
    if (name) {
      updateData.name = name;
    }

    // Add password to update if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // If no valid fields to update
    if (Object.keys(updateData).length === 0) {
      const error = new Error('No valid fields provided for update');
      error.statusCode = 400;
      throw error;
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // Check if the user is trying to delete their own profile
    if (user._id.toString() !== req.user._id.toString()) {
      const error = new Error('Not authorized to delete this profile');
      error.statusCode = 403;
      throw error;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}
