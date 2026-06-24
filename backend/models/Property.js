const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  
  // Categorization
  listingType: { type: String, enum: ['Rent', 'Sale'], required: true },
  propertyType: { type: String, enum: ['House', 'Villa', 'Apartment', 'Plot', 'Commercial Land'], required: true },
  location: { type: String, required: true }, // e.g., Lawspet, Reddiarpalayam
  
  // Specifications
  price: { type: Number, required: true },
  bedrooms: { type: String, enum: ['1BHK', '2BHK', '3BHK', '4+BHK', 'N/A'], default: 'N/A' },
  furnishing: { type: String, enum: ['Furnished', 'Semi-furnished', 'Unfurnished', 'N/A'], default: 'N/A' },
  propertyAge: { type: String, default: 'New' }, // e.g., "New", "1-5 years"
  area: { type: String, required: true }, // e.g., "1200 sq.ft"
  
  // Details & Status
  amenities: [{ type: String }],
  documentsStatus: { type: String, default: 'Pending Verification' }, // e.g., Verified, Pending
  status: { type: String, enum: ['Available', 'Sold', 'Rented'], default: 'Available' },
  isVerified: { type: Boolean, default: false }, // Admin verified badge
  
  // Media (Paths/URLs to local storage or external)
  photos: [{ type: String }],
  video: { type: String },
  threeSixtyView: { type: String }, // Path to 360 image or link
  
  // Contact & Location
  googleMapLink: { type: String },
  ownerDetails: {
    name: { type: String },
    phone: { type: String },
    isBroker: { type: Boolean, default: false },
  },

  // Owner reference
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
