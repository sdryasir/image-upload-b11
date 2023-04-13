import { User } from "../model/userSchema.js";
import bycrypt from 'bcryptjs'
import jwt from "jsonwebtoken";



export const registerUser = async (req, res, next) => {

    const user = req.body;



    // user.password

    // user.password = await bycrypt.hash(user.password, 10)

    // try {
    //     await User.create(user)
    //     res.json({
    //         message: 'The User has been registered'
    //     })
    // } catch (err) {
    //     next(err)
    // }
}

export const loginUser = async (req, res, next) => {

    const { username, password } = req.body;

    if (!username) {
        next(new Error('Please provide username'))
    }

    if (!password) {
        next(new Error('Please provide password'))
    }

    const user = await User.findOne({ username })

    if (!user) {
        next(new Error('username is incorrect'))
    }

    const isPassMatched = await bycrypt.compare(password, user.password)


    if (!isPassMatched) {
        next(new Error('Password is incorrect'))
    }

    //JWT authentication
    const token = jwt.sign({ user: user }, '-YJN-yYNCn1CxYPLypyCoSEUN5r1XsdFhKmeQnle0s5O0qB_StUwn-ZOBV4DXVwIBnq7X3XVfgdpuSj4PyUHZUroJWnR5ChEd4-nkLIejICV6MOCOvU-Tmie_iXu4eCcK9tdWnMvsMNnKf29UcduJNyuR7CFhKmlq-Dq10uiv6c')




    res.cookie("token", token, { expires: new Date(Date.now() + 360000) , httpOnly: true }).json({
        user,
        token
    })

   

    


}


export const logOutUser = async (req, res, next) => {
    res.cookie("token", null, { expires: new Date(Date.now()) }).json({
        message:"You are logged out"
    })
}
