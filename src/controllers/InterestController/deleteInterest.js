const { UserInterest } = require('../../models/userInterestModel');

const deleteInterest = async (req, res) => {
  // Vérifier si l'utilisateur est connecté en utilisant les informations stockées dans la session
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'Utilisateur non connecté' });
  }

  const userId = req.session.user_id;
  const { interestId } = req.params;

  try {
    await UserInterest.destroy({ where: { userId, centerOfInterestId: interestId } });

    res.status(200).json({ message: 'Interest deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user interest' });
  }
};

module.exports = deleteInterest;
