const db = require('../../../models');
const cohorts = db.cohorts;

async function getCohortsById(req, res) {
    const { id } = req.params;
    try {
        const schedule = await cohorts.findByPk(id);
        if (schedule) {
            res.status(200).json(schedule);
        } else {
            res.status(404).json({ error: 'Schedule not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the schedule.' });
    }
}
module.exports = getCohortsById