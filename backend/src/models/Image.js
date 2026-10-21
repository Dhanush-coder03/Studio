import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Image URL or data URI is required'],
    },
    category: {
      type: String,
      default: 'Showcase',
      enum: ['Showcase', 'Wedding', 'Traditional', 'Pre-Wedding', 'Maternity', 'Kids', 'Equipment', 'Other'],
    },
    caption: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for id mapped to _id
imageSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret.__v;
    return ret;
  },
});

export const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);
export default Image;
