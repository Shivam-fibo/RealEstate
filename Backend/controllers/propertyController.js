import Property from '../models/Property.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import multer from 'multer';
import dotenv from 'dotenv';    
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer configuration for memory storage
const storage = multer.memoryStorage();

export const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10 // Max 10 images
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
}).array('images', 10); 


const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'real-estate/properties',
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    
    const bufferStream = streamifier.createReadStream(buffer);
    bufferStream.pipe(uploadStream);
  });
};

// Create Property with Images
export const createProperty = async (req, res) => {
  try {
    const {
      title,
      price,
      location,
      bhk,
      carpetArea,
      builtUpArea,
      furnishingStatus,
      reraApproved,
      reraId,
      ownership,
      completionStatus,
      builder,
      amenities,
      possessionDate
    } = req.body;

    // Basic validation
    if (!title || !price || !location || !bhk || !carpetArea || !builtUpArea || 
        !furnishingStatus || !ownership || !completionStatus || !builder) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    // Check if images were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'At least one image is required' 
      });
    }

    // Upload images to Cloudinary
    const imageUploadPromises = req.files.map(file => 
      uploadToCloudinary(file.buffer)
    );

    const uploadedImages = await Promise.all(imageUploadPromises);

    // Parse location if it's a string
    let locationObj;
    try {
      locationObj = typeof location === 'string' ? JSON.parse(location) : location;
    } catch (error) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid location format' 
      });
    }

    // Create property with image URLs
    const property = await Property.create({
      title,
      price: Number(price),
      location: locationObj,
      bhk: Number(bhk),
      carpetArea: Number(carpetArea),
      builtUpArea: Number(builtUpArea),
      furnishingStatus,
      reraApproved: reraApproved === 'true',
      reraId,
      ownership,
      completionStatus,
      builder,
      amenities: Array.isArray(amenities) ? amenities : amenities.split(',').map(a => a.trim()),
      possessionDate,
      images: uploadedImages.map(img => ({
        url: img.secure_url,
        publicId: img.public_id
      })),
    });

    res.status(201).json({
      success: true,
      data: property
    });

  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating property',
      error: error.message
    });
  }
};


export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Delete images from Cloudinary
    const deletePromises = property.images.map(img => cloudinary.uploader.destroy(img.publicId));
    await Promise.all(deletePromises);

    // Remove from DB
    await property.deleteOne();

    res.status(200).json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};




export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

  
    if (updates.location && typeof updates.location === 'string') {
      try {
        updates.location = JSON.parse(updates.location);
      } catch (err) {
        return res.status(400).json({ success: false, message: 'Invalid location format' });
      }
    }

    // Convert amenities string to array if necessary
    if (updates.amenities && typeof updates.amenities === 'string') {
      updates.amenities = updates.amenities.split(',').map(a => a.trim());
    }

    // Optional: replace images if new ones are uploaded
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      const deletePromises = property.images.map(img =>
        cloudinary.uploader.destroy(img.publicId)
      );
      await Promise.all(deletePromises);

      // Upload new images
      const imageUploadPromises = req.files.map(file =>
        uploadToCloudinary(file.buffer)
      );
      const uploadedImages = await Promise.all(imageUploadPromises);

      updates.images = uploadedImages.map(img => ({
        url: img.secure_url,
        publicId: img.public_id
      }));
    }

    // Update property
    Object.assign(property, updates);
    const updatedProperty = await property.save();

    res.status(200).json({
      success: true,
      data: updatedProperty
    });

  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
