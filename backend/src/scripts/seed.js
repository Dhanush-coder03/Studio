import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Image from '../models/Image.js';
import Service from '../models/Service.js';
import GalleryItem from '../models/GalleryItem.js';
import Package from '../models/Package.js';
import ContactInfo from '../models/ContactInfo.js';
import Inquiry from '../models/Inquiry.js';
import {
  initialImages,
  initialServices,
  initialGallery,
  initialPackages,
  initialContactInfo,
  initialInquiries,
} from '../data/initialData.js';

dotenv.config();

async function runSeed() {
  try {
    console.log('🌱 Connecting to MongoDB Atlas...');
    await connectDB();

    console.log('🧹 Clearing existing collections...');
    await Promise.all([
      Image.deleteMany({}),
      Service.deleteMany({}),
      GalleryItem.deleteMany({}),
      Package.deleteMany({}),
      ContactInfo.deleteMany({}),
      Inquiry.deleteMany({}),
    ]);

    console.log('📦 Seeding initial data...');
    await Image.insertMany(initialImages);
    await Service.insertMany(initialServices);
    await GalleryItem.insertMany(initialGallery);
    await Package.insertMany(initialPackages);
    await ContactInfo.create(initialContactInfo);
    await Inquiry.insertMany(initialInquiries);

    console.log('✅ Velu Photography Studio database seeded successfully on MongoDB Atlas!');
    console.log(`📸 Images: ${await Image.countDocuments()}`);
    console.log(`🛎️ Services: ${await Service.countDocuments()}`);
    console.log(`🖼️ Gallery items: ${await GalleryItem.countDocuments()}`);
    console.log(`💎 Packages: ${await Package.countDocuments()}`);
    console.log(`📬 Inquiries: ${await Inquiry.countDocuments()}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

runSeed();
