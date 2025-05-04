import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Username is required"],
			trim: true,
			minLength: 2,
			maxLenght: 50,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
			lowercase: true,
			match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minLength: 6,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)


const User = mongoose.model('User', userSchema)

export default User

