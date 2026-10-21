import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Package name is required'],
      trim: true,
    },
    badge: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Package price is required'],
      trim: true,
    },
    period: {
      type: String,
      default: 'Full Event',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    deliverablesSummary: {
      type: String,
      default: '',
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

packageSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret.__v;
    return ret;
  },
});

export const Package = mongoose.models.Package || mongoose.model('Package', packageSchema);
export default Package;
