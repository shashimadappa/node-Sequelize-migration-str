const { format } = require('mysql2');
const db = require('../../../models');
const cohortEvents = db.cohort_events;

async function getCohortsById(req, res) {
    const cohortId = req.params.id;

  try {
    const events = await cohortEvents.findAll({
      where: { cohort_id: cohortId },
    //   order: [['order', 'ASC']] // Sorting events by the 'order' field
    });

    if (!events.length) {
      return res.status(404).json({ message: 'No events found for the specified cohort.' });
    }

    res.status(200).json({
      message: 'Cohort events retrieved successfully',
      data: events,
    });

  } catch (error) {
    console.error('Error retrieving cohort events:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the cohort events.' });
  }
}
module.exports = getCohortsById