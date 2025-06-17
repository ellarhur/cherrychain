import mongoose from 'mongoose';
import AppError from '../middleware/appError.mjs';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.JWT_SECRET); // Använd JWT-hemlighet
console.log(process.env.MONGO_URI);  // Koppla till databasen


const connectDb = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new AppError('MONGO_URI saknas i miljövariablerna.', 500);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🟢 Ansluten till MongoDB');
  } catch (err) {
    console.error('🔴 MongoDB-anslutning misslyckades:', err);
    throw new AppError('Kunde inte ansluta till databasen', 500);
  }
};

export default connectDb;
