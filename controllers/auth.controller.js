import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user.model.js"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js"

export const signUp = async (req, res, next) => {
	const session = await mongoose.startSession()
	session.startTransaction()
	try {
		const { name, email, password } = req.body

		// check if the user exists
		const existingUser = await User.findOne({ email })

		if (existingUser) {
			const error = new Error("User already exists")
			error.statusCode = 409
			next(error)
		}

		// hash the password
		const salt = await bcrypt.genSalt(10)

		const hashedPassword = await bcrypt.hash(password, salt)

		let newUsers = await User.create(
			[{ name, email, password: hashedPassword }],
			{ session }
		)

		const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		})

		await session.commitTransaction()
		session.endSession()

		newUsers = newUsers[0].toObject();
		delete newUsers.password;

		res.status(201).json({
			success: true,
			message: "User created Successfully",
			data: {
				token,
				user: newUsers,
			},
		})
	} catch (error) {
		await session.abortTransaction()
		session.endSession()
		next(error)
	}
}

export const signIn = async (req, res, next) => {
	try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if(!user) {
			const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
		

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

		user = user.toObject();
		delete user.password;

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user,
      }
    });
  } catch (error) {
    next(error);
  }
}

