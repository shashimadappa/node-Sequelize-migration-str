const db = require('../../../models');
const cohorts = db.cohorts;

async function getCohortsById(req, res) {
    try {
        const schedule = await cohorts.findAll({
            order: [['created_at', 'DESC']]
        });
        if (schedule.length > 0) {
            res.status(200).json(schedule);
        } else {
            res.status(404).json({ error: 'cohorts not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the cohorts.' });
    }
}
module.exports = getCohortsById