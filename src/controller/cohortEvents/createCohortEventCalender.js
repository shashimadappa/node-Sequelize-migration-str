const db = require('../../../models');
const cohortsEvents = db.cohort_events;

async function createCohourt(req, res) {
    try {
        const { cohort_id, epic, name, lecture_hours, inovate_hours, judging_hours, order, type, assigned_date } = req.body;
    
        // Example of converting the assigned_date before saving
        // const formattedAssignedDate = assigned_date.map(date => convertDateToMMDDYYYY(date));
    
        const newEvent = await cohortsEvents.create({
          cohort_id,
          epic,
          name,
          lecture_hours,
          inovate_hours,
          judging_hours,
          order,
          type,
          assigned_date
        });
    
        res.status(201).json({ message: 'Cohort event created successfully', data: newEvent });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating cohort event', error: error.message });
      }
}

module.exports = createCohourt