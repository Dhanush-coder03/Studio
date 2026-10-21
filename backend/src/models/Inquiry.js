import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      default: '',
      trim: true,
    },
    weddingDate: {
      type: String,
      default: '',
      trim: true,
    },
    eventType: {
      type: String,
      default: 'Traditional Tamil Wedding',
      trim: true,
    },
    packageInterested: {
      type: String,
      default: '',
      trim: true,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Booked', 'Archived'],
      default: 'New',
    },
    dateReceived: {
      type: String,
      default: () => new Date().toLocaleString(),
    },
  },
  {
    timestamps: true,
  }
);

inquirySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret.__v;
    return ret;
  },
});

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
