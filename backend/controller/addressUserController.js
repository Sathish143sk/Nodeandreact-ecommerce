// controllers/addressController.js
const Address =require ("../models/addressModel");

// Add new address
const addAddress = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { fullName, phoneNumber, street, city, state, postalCode, country, isDefault } = req.body;

    // If default, unset existing default
    if (isDefault) {
      await Address.updateMany({ user: userId }, { $set: { isDefault: false } });
    }

    const newAddress = new Address({
      user: userId,
      fullName,
      phoneNumber,
      street,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

    await newAddress.save();
    res.status(201).json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all addresses for a user
const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update address
 const updateAddress = async (req, res) => {
  try {
    const { id } = req.params; // address id
    const userId = req.user.id;

    // If setting as default, unset other defaults
    if (req.body.isDefault) {
      await Address.updateMany({ user: userId }, { $set: { isDefault: false } });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: id, user: userId },
      req.body,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address updated", address: updatedAddress });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete address
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params; // address id
    const userId = req.user.id;

    const deleted = await Address.findOneAndDelete({ _id: id, user: userId });

    if (!deleted) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports={
    addAddress,
    getUserAddresses,
    updateAddress,
    deleteAddress,
}
