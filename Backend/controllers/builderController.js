import Builder from '../models/Builder.js';


export const createBuilder = async (req, res) => {
  try {
    const { name, description, website, contactEmail, phoneNumber } = req.body;

    if (!name || !description || !contactEmail || !phoneNumber) {
      return res.status(400).json({ message: 'Name, description, email, and phone number are required.' });
    }

    const newBuilder = new Builder({
      name,
      description,
      website,
      contactEmail,
      phoneNumber
    });

    const savedBuilder = await newBuilder.save();
    res.status(201).json(savedBuilder);
  } catch (error) {
    console.error('Error creating builder:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
