const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'onecoimbatore@gmail.com' });
    
    if (adminExists) {
      console.log('Admin user already exists. Deleting it to recreate with new credentials...');
      await User.deleteOne({ email: 'onecoimbatore@gmail.com' });
    }

    const adminUser = new User({
      name: 'Coimbatore Admin',
      email: 'onecoimbatore@gmail.com',
      password: 'Coimbatore@123', // Will be hashed by pre-save middleware
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
