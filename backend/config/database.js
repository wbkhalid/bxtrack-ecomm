import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`)
    console.log('MongoDB connected...');
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
}

export default connectDB
