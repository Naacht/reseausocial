const { Report } = require('../../models/reportModel');
const { Post } = require('../../models/postModel');

const createPostReport = async (req, res) => {
  const { userId, reportedPostId, reason } = req.body;

  try {
    // Check if the reported post exists
    const postExists = await Post.findByPk(reportedPostId);
    if (!postExists) {
      return res.status(404).json({ error: 'Reported post not found' });
    }

    const report = await Report.create({
      userId,
      reportedPostId,
      reason,
    });

    res.status(201).json({ message: 'Report created successfully', report });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = createPostReport;

