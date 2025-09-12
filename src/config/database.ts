import mongoose from 'mongoose';

export async function connectToDatabase(): Promise<void> {
  const uri = process.env.DB_URI;
  if (!uri) {
    throw new Error('DB_URI is not set in environment');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  // eslint-disable-next-line no-console
  console.log('✅ Connected to MongoDB');
}



