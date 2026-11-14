import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema(
  {
    studioName: {
      type: String,
      default: 'Velu Photographs',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'Luxury Wedding Photography & Candid Studio',
      trim: true,
    },
    ownerName: {
      type: String,
      default: 'Velu',
      trim: true,
    },
    phone: {
      type: String,
      default: '+91 96007 77591',
      trim: true,
    },
    altPhone: {
      type: String,
      default: '+91 96007 77591',
      trim: true,
    },
    email: {
      type: String,
      default: 'contact@veluphotography.com',
      trim: true,
    },
    address: {
      type: String,
      default: 'Kurumathur, Gobichettipalayam, Erode, Tamil Nadu 638457',
      trim: true,
    },
    workingHours: {
      type: String,
      default: 'Mon - Sun: 9:00 AM - 9:00 PM',
      trim: true,
    },
    whatsapp: {
      type: String,
      default: '919600777591',
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
