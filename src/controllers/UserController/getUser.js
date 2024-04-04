const { User } = require('../../models/userModel');

const getUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'username', 'profile_picture', 'account_creation_date'],
    });

    if (user) {
      return res.status(200).json({
        success: true,
        user: user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = getUser;
