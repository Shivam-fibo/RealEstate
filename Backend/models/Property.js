import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Property price is required'],
    min: [0, 'Price cannot be negative']
  },
  location: {
    city: {
      type: String,
      required: [true, 'City is required']
    },
    area: {
      type: String,
      required: [true, 'Area is required']
    },
  },
  bhk: {
    type: Number,
    required: [true, 'BHK configuration is required'],
    enum: [1, 2, 3, 4, 5, 6]
  },
  carpetArea: {
    type: Number,
    required: [true, 'Carpet area is required']
  },
  builtUpArea: {
    type: Number,
    required: [true, 'Built-up area is required']
  },
  furnishingStatus: {
    type: String,
    enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
    required: true
  },
  images: [{
    url: String,
    caption: String
  }],
  videos: [{
    url: String,
    caption: String
  }],
  reraApproved: {
    type: Boolean,
    default: false
  },
  reraId: String,
  ownership: {
    type: String,
    enum: ['Freehold', 'Leasehold', 'Co-operative Society', 'Power of Attorney'],
    required: true
  },
  completionStatus: {
    type: String,
    enum: ['Under-construction', 'Ready to move', 'New Launch'],
    required: true
  },
  builder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Builder',
    required: true
  },
  amenities: [String],
  possessionDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for average rating
propertySchema.virtual('averageRating').get(function() {
  if (this.reviews && this.reviews.length > 0) {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / this.reviews.length;
  }
  return 0;
});


const Property = mongoose.model('Property', propertySchema);

export default Property;