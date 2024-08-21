const db = require('../../../models');
const cohorts = db.cohorts;

async function createCohourt(req, res) {
    const { name, startdate, format, holidays, sessions_per_day, sessions_time } = req.body;

    try {
        if (holidays && typeof holidays !== 'object') {
            return res.status(400).json({ message: 'Invalid format for holidays. It should be a JSON object.' });
        }

        const savedCohort = await cohorts.create({
            name,
            startdate,
            format,
            holidays,
            sessions_per_day,
            sessions_time,
        });

        res.status(201).json({
            message: 'Cohort created successfully',
            data: savedCohort,
        });

    } catch (error) {
        console.error('Error creating cohort:', error);
        res.status(500).json({
            message: 'Error creating cohort',
            error: error.message,
        });
    }
}

module.exports = createCohourt


// {
//     "name": "Course Schedule",
//     "startdate": "2024-09-01",
//     "format": "mwf",
//     "holidays": ["2024-09-10", "2024-09-15"],
//     "sessions_per_day": 4,
//     "sessions_time": {
//       "session1": { "startdate": "2024-09-01", "enddate": "2024-09-03" },
//       "session2": { "startdate": "2024-09-04", "enddate": "2024-09-06" }
//     }
//   }
