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

// Update Builder
export const updateBuilder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBuilder = await Builder.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBuilder) {
      return res.status(404).json({ message: 'Builder not found' });
    }

    res.status(200).json(updatedBuilder);
  } catch (error) {
    console.error('Error updating builder:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Builder
export const deleteBuilder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBuilder = await Builder.findByIdAndDelete(id);

    if (!deletedBuilder) {
      return res.status(404).json({ message: 'Builder not found' });
    }

    res.status(200).json({ message: 'Builder deleted successfully' });
  } catch (error) {
    console.error('Error deleting builder:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
