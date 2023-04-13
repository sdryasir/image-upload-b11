import mongoose from 'mongoose';



export const connectDB = async () => {

    await mongoose.connect('mongodb+srv://ba1770490:aoKEsa3l0Cbh45jg@cluster0.a9cu5dm.mongodb.net/todo')
        .then(() => console.log('DB Connection Successful!'));

}