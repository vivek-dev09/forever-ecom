import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

///route for user  login


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}


const loginUser = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        console.log("USER:", user);

        if (!user) {
            return res.json({ success: false, message: "user not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("PASSWORD MATCH:", isMatch);

        if (isMatch) {
            console.log("Inside isMatch");

            const token = createToken(user._id);

            console.log("Generated Token:", token);

            return res.json({
                success: true,
                token
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        });
    }
};


///route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //check if user already exists
        const exists = await userModel.findOne({ email })
        if (exists) {

            return res.status(400).json({ message: "User already exists", success: false })
        }
        //validating email and password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email", success: false })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters", success: false })
        }
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)
        res.status(201).json({ success: true, token })








    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal server error", success: false })
    }
}


//route for admin login

const adminLogin = async (req, res) => {

    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "invalid credentials" })
        }
    } catch (error) {
        console.log(error);

        res.json({ success: false, message: error.message })
    }


}



export { loginUser, registerUser, adminLogin }  