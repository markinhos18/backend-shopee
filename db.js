import mongoose from "mongoose";

const url = process.env.MONGODB_URL;
mongoose.connect(url);

// console.log(url);

export default mongoose;
