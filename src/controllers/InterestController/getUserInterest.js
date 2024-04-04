const { UserInterest } = require('../../models/userInterestModel');
const { Interest } = require('../../models/interestModel');

const getUserInterest = async (req, res) => {
  const { userId } = req.params;

  try {
    const userInterests = await UserInterest.findAll({
      where: { userId },
      include: [
        {
          model: Interest,
          as: 'centerOfInterest',
        },
      ],
    });

    res.status(200).json({ userInterests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user interests' });
  }
};

module.exports = getUserInterest;