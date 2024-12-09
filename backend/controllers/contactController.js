import Contact from "../models/Contact.js";

export const submitContactForm = async (req, res) => {
  const { firstName, lastName, email, phone, message, reason } = req.body;

  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message,
      reason,
    });
    await newContact.save();
    res.status(200).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting form", error });
  }
};

export const getContactDetails = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching contact submissions", error });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

export const getContactStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    res.json({ totalContacts });
  } catch (error) {
    console.error("Error fetching contact stats:", error);
    res.status(500).json({ message: "Error fetching contact stats" });
  }
};
