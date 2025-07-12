import mongoose from 'mongoose';

const builderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    default: '',
  },
  contactEmail: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Builder = mongoose.model('Builder', builderSchema);
export default Builder;
