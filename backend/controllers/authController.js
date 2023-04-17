import { User } from "../model/userSchema.js";
import bycrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import path from 'path';
const __dirname = path.resolve();
import fs from 'fs';

export const registerUser = async (req, res, next) => {

    const user = req.body;


    try {
        const encoded = user.avatar;
        const base64ToArray = encoded.split(";base64,");
        const prefix = base64ToArray[0];
        const extension = prefix.replace(/^data:image\//, '');
        
        if (extension === 'jpeg' || extension === 'jpg' || extension === 'png')
        {

            const imageData = base64ToArray[1];
            const fileName = (new Date().getTime() / 1000|0) + '.' + extension;
            const imagePath = path.join(__dirname, './uploads/') + fileName; //upload/32658921_abc.jpg
            const filePath = path.resolve(imagePath);


            

            if(fs.writeFileSync(filePath, imageData,  { encoding: 'base64' })){
                user.avatar = filePath
                user.password
                user.password = await bycrypt.hash(user.password, 10)
    
                await User.create(user)
            }

            return res.status(201).json({
                error: false,
                message: "Account has been created",
            });
        }
        else {
            return res.status(403).json({
                error: true,
                message: "Base64 data not valid!",
            });
        }
    }
    catch (e) {
        return res.status(403).json({
            error: true,
            message: e.message,
        });
    }



    
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
