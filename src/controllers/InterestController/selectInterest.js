const { UserInterest } = require('../../models/userInterestModel');

const selectInterest = async (req, res) => {
  // Vérifier si l'utilisateur est connecté en utilisant les informations stockées dans la session
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'Utilisateur non connecté' });
  }

  const userId = req.session.user_id;
  const { selectedInterests } = req.body;

  try {
    await UserInterest.destroy({ where: { userId } });

    if (selectedInterests && Array.isArray(selectedInterests)) {
      await UserInterest.bulkCreate(
        selectedInterests.map(interestId => ({ userId, centerOfInterestId: interestId }))
      );
      res.status(200).json({ message: 'Interests selected successfully' });
    } else {
      res.status(400).json({ message: 'Invalid selectedInterests format' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error handling user interest selections' });
  }
};

module.exports = selectInterest;
