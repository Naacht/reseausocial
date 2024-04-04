const { Report } = require('../../models/reportModel');

const getAllReport = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.status(200).json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = getAllReport;
