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

export const seedDatabase = async (req, res, next) => {
  try {
    const { force } = req.body || {};

    if (force) {
      await Promise.all([
        Image.deleteMany({}),
        Service.deleteMany({}),
        GalleryItem.deleteMany({}),
        Package.deleteMany({}),
        ContactInfo.deleteMany({}),
        Inquiry.deleteMany({}),
      ]);
    }

    const imageCount = await Image.countDocuments();
    if (imageCount === 0 || force) {
      await Image.insertMany(initialImages);
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0 || force) {
      await Service.insertMany(initialServices);
    }

    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0 || force) {
      await GalleryItem.insertMany(initialGallery);
    }

    const packageCount = await Package.countDocuments();
    if (packageCount === 0 || force) {
      await Package.insertMany(initialPackages);
    }

    const contactCount = await ContactInfo.countDocuments();
    if (contactCount === 0 || force) {
      await ContactInfo.create(initialContactInfo);
    }

    const inquiryCount = await Inquiry.countDocuments();
    if (inquiryCount === 0 || force) {
      await Inquiry.insertMany(initialInquiries);
    }

    res.json({
      success: true,
      message: 'Database seeded successfully with Velu Studio content!',
      counts: {
        images: await Image.countDocuments(),
        services: await Service.countDocuments(),
        gallery: await GalleryItem.countDocuments(),
        packages: await Package.countDocuments(),
        inquiries: await Inquiry.countDocuments(),
      },
    });
  } catch (error) {
    next(error);
  }
};
