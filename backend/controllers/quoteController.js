import Quote from "../models/quote.js";

// Request quote
export const requestQuote = async (req, res) => {
  const { productId, name, email, quantity, requirements } = req.body;

  try {
    const newQuote = new Quote({
      productId,
      name,
      email,
      quantity,
      requirements,
    });

    await newQuote.save();
    res.status(200).json({ message: "Quote request sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send quote request", error });
  }
};

// Get all quote queries
export const getRequestAllQuoteQueries = async (req, res) => {
  try {
    const quotes = await Quote.find().populate("productId", "title");

    res.status(200).json({ quotes });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
};

// Delete a quote
export const deleteQuote = async (req, res) => {
  const { id } = req.params; // Extract quote ID from URL parameters

  try {
    const deletedQuote = await Quote.findByIdAndDelete(id);

    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    res.status(200).json({ message: "Quote deleted successfully" });
  } catch (error) {
    console.error("Error deleting quote:", error);
    res.status(500).json({ error: "Failed to delete quote" });
  }
};
