import mongoose from 'mongoose';
const { Schema } = mongoose;


const todoSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Title is required'],
        minLength : [4 , 'please provide at lest 4 characters'],
        maxLength : [20 , 'please provide atmost 20 characters'],
        unique : true
    },
    body : {
        type : String,
        required : [true, 'Body is required'],
        minLength : [2 , 'please provide at lest 2 characters'],
        maxLength : [100 , 'please provide atmost 100 characters'],
        unique : true
    },
    status : {
        type : Boolean,
        required : [true, 'Status is required'],
        
    }
})

export const Todo = mongoose.model('todo', todoSchema);