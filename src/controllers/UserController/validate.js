const { User } = require('../../models/userModel');

const validate = async (req, res) => {
    const { validationCode } = req.body;
  
    try {
      // Find the user by verification code
      const user = await User.findOne({
        where: { verification_code: validationCode },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid verification code' });
      }
  
      // Update the validation column to true
      await user.update({ validation: true });
      await user.update({ verification_code: null });
  
      res.status(200).json({ message: 'User validated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = validate;