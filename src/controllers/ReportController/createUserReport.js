const { User } = require('../../models/userModel');
const { Report } = require('../../models/reportModel');

const createUserReport = async (req, res) => {
  const { userId, reportedUserId, reason } = req.body;

  try {
    // Check if the reported user exists
    const userExists = await User.findByPk(reportedUserId);
    if (!userExists) {
      return res.status(404).json({ error: 'Reported user not found' });
    }

    const report = await Report.create({
      userId,
      reportedUserId,
      reason,
    });

    res.status(201).json({ message: 'Report created successfully', report });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = createUserReport;
