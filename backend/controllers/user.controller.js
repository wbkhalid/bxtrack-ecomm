import userModel from "../models/userModal.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (passwordMatch) {

            const token = createToken(user._id)

            return res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invlaid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const emailExist = await userModel.find({ email })


        if (emailExist.length >= 1) {
            return res.json({ success: false, message: 'User already exist' })
        }


        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please Enter valid email' })
        }

        if (password.length < 0) {
            return res.json({ success: false, message: 'Please Enter strong password' })
        }


        const salt = bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, Number(salt))

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user?._id)
        return res.json({ success: true, token: token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token: token })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { loginUser, registerUser, adminLogin }