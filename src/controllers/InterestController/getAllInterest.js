const { Interest } = require('../../models/interestModel');

const getAllInterest = async (req, res) => {
  try {
    const allInterests = await Interest.findAll();

    res.status(200).json({ allInterests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching all interests' });
  }
};

module.exports = getAllInterest;
