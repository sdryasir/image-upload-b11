import mongoose from 'mongoose';
const { Schema } = mongoose;


const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Please Enter the full name'],
        unique : false

    },
    username: {
        type: String,
        required: [true, 'Body is required'],
        minLength: [4, 'please provide at lest 2 characters for username'],
        maxLength: [20, 'please provide atmost 100 characters for username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password is required'],

    },
    avatar: {
        type: String

    },
    role: {
        type: String,
        enum : ['admin', 'teacher', 'student', 'user'],
        default : 'user'

    }
}, {
    timestamps : true
}
)

export const User = mongoose.model('user', userSchema);