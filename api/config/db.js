import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log('Connected.');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;