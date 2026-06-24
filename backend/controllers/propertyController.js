const Property = require('../models/Property');

// @desc    Get all properties with advanced filtering
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
  try {
    const { 
      q, // Search query for title/location/description
      location, 
      propertyType, 
      listingType, 
      minPrice, 
      maxPrice, 
      bedrooms, 
      furnishing, 
      propertyAge,
      status // e.g. "Available"
    } = req.query;

    let query = {};

    // 1. Text Search
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ];
    }

    // 2. Exact/Regex Filters
    if (location) query.location = { $regex: location, $options: 'i' };
    if (propertyType) query.propertyType = propertyType;
    if (listingType) query.listingType = listingType;
    if (bedrooms) query.bedrooms = bedrooms;
    if (furnishing) query.furnishing = furnishing;
    if (propertyAge) query.propertyAge = propertyAge;
    
    // Default to 'Available' unless admin requests all
    if (status) {
      query.status = status;
    } else {
      // By default public API only shows Available properties
      // query.status = 'Available'; // Uncomment this to hide sold/rented from public feed
    }

    // 3. Price Range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('user', 'name email phone');
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private (Owner/Admin)
const createProperty = async (req, res) => {
  try {
    if (req.user.role === 'customer') {
      return res.status(403).json({ message: 'Customers cannot create properties' });
    }

    const property = new Property({
      ...req.body,
      user: req.user._id,
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private (Owner/Admin)
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      // Check if user is the owner or an admin
      const isOwner = property.user && property.user.toString() === req.user._id.toString();
      if (!isOwner && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update this property' });
      }

      const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private (Owner/Admin)
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      const isOwner = property.user && property.user.toString() === req.user._id.toString();
      if (!isOwner && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to delete this property' });
      }
      await Property.findByIdAndDelete(req.params.id);
      res.json({ message: 'Property removed' });
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty };
