import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema(
  {
    studioName: {
      type: String,
      default: 'Velu Photography Studio',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'Luxury Wedding Photography & Cinematic Films',
      trim: true,
    },
    ownerName: {
      type: String,
      default: 'Velu Rathinam',
      trim: true,
    },
    phone: {
      type: String,
      default: '+91 98401 23456',
      trim: true,
    },
    altPhone: {
      type: String,
      default: '+91 94440 98765',
      trim: true,
    },
    email: {
      type: String,
      default: 'hello@veluphotography.com',
      trim: true,
    },
    address: {
      type: String,
      default: 'No. 48, Heritage Square, Opp. Express Avenue, Anna Salai, Chennai, Tamil Nadu 600002',
      trim: true,
    },
    workingHours: {
      type: String,
      default: 'Mon - Sat: 9:30 AM - 8:30 PM (Sunday by Appointment)',
      trim: true,
    },
    whatsapp: {
      type: String,
      default: '+919840123456',
      trim: true,
    },
    instagram: {
      type: String,
      default: 'https://instagram.com/veluphotography',
      trim: true,
    },
    facebook: {
      type: String,
      default: 'https://facebook.com/veluphotography',
      trim: true,
    },
    youtube: {
      type: String,
      default: 'https://youtube.com/@veluphotography',
      trim: true,
    },
    mapEmbedUrl: {
      type: String,
      default: 'https://maps.google.com/?q=Anna+Salai+Chennai',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

contactInfoSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret.__v;
    return ret;
  },
});

export const ContactInfo = mongoose.models.ContactInfo || mongoose.model('ContactInfo', contactInfoSchema);
export default ContactInfo;
