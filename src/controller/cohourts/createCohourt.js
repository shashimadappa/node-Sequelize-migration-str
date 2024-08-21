const db = require('../../../models');
const cohorts = db.cohorts;

const inputArray = [
  {
    "Epic": "Serial Storyteller1",
    "Name": "A Storyteller's Mindset: Foundations of Content Creation",
    "LectureHours": 2,
    "InnovateHours": 2,
    "JudgingHours": 2,
    "Order": 1,
    "Type": "Workshop"
  },
  {
    "Epic": "Serial Storyteller2",
    "Name": "Put your ideas on paper: Storyboarding and Scripting",
    "LectureHours": 4,
    "InnovateHours": 4,
    "JudgingHours": 2,
    "Order": 2,
    "Type": "Live Brief"
  },
  {
    "Epic": "Serial Storyteller3",
    "Name": "The Storytelling Blueprint: Understanding Narrative Structures",
    "LectureHours": 2,
    "InnovateHours": 2,
    "JudgingHours": 2,
    "Order": 3,
    "Type": "Live Brief"
  },
  {
    "Epic": "Serial Storyteller",
    "Name": "What makes a story viral? Copywriting for shares on Stories and DMs",
    "LectureHours": 6,
    "InnovateHours": 6,
    "JudgingHours": 2,
    "Order": 4,
    "Type": "Live Brief"
  }
];


// Helper function to format dates
function formatDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('en-US', options).replace(/\//g, '/'); // Format MM/DD/YYYY
}

// Helper function to parse MM/DD/YYYY string into Date object
function parseDate(dateStr) {
  const [month, day, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day); // JavaScript months are 0-based
}

// Helper function to add days to a date
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Helper function to skip non-working days
function skipNonWorkingDays(date, holidays) {
  while (date.getDay() === 0 || holidays.includes(formatDate(date))) { // 0 represents Sunday
    date = addDays(date, 1);
  }
  return date;
}

// Helper function to check if a date matches the format
function isFormatDay(date, format) {
  const dayOfWeek = date.getDay(); // 0: Sunday, 1: Monday, 2: Tuesday, etc.
  if (format === 'MWF') {
    return dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5; // Monday, Wednesday, Friday
  } else if (format === 'TTS') {
    return dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6; // Tuesday, Thursday, Saturday
  }
  return false; // Invalid format
}

// Function to process the input array and generate the output
function processSchedules(inputArray, startDateStr, holidays, format, sessionsPerDay) {
  let currentDate = parseDate(startDateStr);
  holidays = holidays.map(date => date.replace(/\//g, '/')); // Ensure holidays format is MM/DD/YYYY
  currentDate = skipNonWorkingDays(currentDate, holidays); // Skip any Sundays or holidays in the start date
  const outputArray = [];

  // Helper function to assign hours to days
  function assignHours(sessionType, hours, assignedDates) {
    while (hours > 0) {
      if (sessionType === 'Lecture' || sessionType === 'Judging') {
        // Find a valid day for Lecture or Judging based on the format
        while (!isFormatDay(currentDate, format) || holidays.includes(formatDate(currentDate))) {
          currentDate = addDays(currentDate, 1);
          currentDate = skipNonWorkingDays(currentDate, holidays); // Skip Sundays and holidays
        }
      }

      const sessionHours = Math.min(hours, sessionsPerDay); // Assign hours based on sessionsPerDay input
      assignedDates.push({
        date: formatDate(currentDate),
        day: currentDate.toLocaleDateString(undefined, { weekday: 'long' }),
        sessionType: sessionType,
        hours: sessionHours
      });
      hours -= sessionHours;
      currentDate = addDays(currentDate, 1);
      currentDate = skipNonWorkingDays(currentDate, holidays); // Skip Sundays and holidays
    }
  }

  inputArray.forEach(item => {
    const assignedDates = [];

    let lectureHours = item.LectureHours;
    let innovateHours = item.InnovateHours;

    // Assign Lecture and Innovate hours alternately
    while (lectureHours > 0 || innovateHours > 0) {
      if (lectureHours > 0) {
        assignHours('Lecture', Math.min(lectureHours, sessionsPerDay), assignedDates);
        lectureHours -= sessionsPerDay;
      }
      if (innovateHours > 0) {
        assignHours('Innovate', Math.min(innovateHours, sessionsPerDay), assignedDates);
        innovateHours -= sessionsPerDay;
      }
    }

    // Assign Judging hours after all Lecture and Innovate hours are assigned
    if (item.JudgingHours > 0) {
      assignHours('Judging', item.JudgingHours, assignedDates);
    }

    // Add the processed item with assigned dates to the output
    outputArray.push({
      Epic: item.Epic,
      Name: item.Name,
      LectureHours: item.LectureHours,
      InnovateHours: item.InnovateHours,
      JudgingHours: item.JudgingHours,
      Order: item.Order,
      Type: item.Type,
      assignedDates: assignedDates
    });
  });

  return outputArray;
}


async function createCohourt(req, res) {

  // Example usage
  const startDate = '08/13/2024'; // Set your start date here in MM/DD/YYYY format
  const holidays = ['08/14/2024', '08/20/2024']; // List of holidays in MM/DD/YYYY format
  const format = 'TTS'; // Scheduling format
  const sessionsPerDay = 4; // Set the sessionsPerDay (2, 4, or 6)
  const result = processSchedules(inputArray, startDate, holidays, format, sessionsPerDay);


  res.status(201).json({
    message: 'Cohort created successfully',
    data: result,
  });
}

module.exports = createCohourt





// const { format } = require('mysql2');
// const db = require('../../../models');
// const cohorts = db.cohorts;


// // Helper function to format dates
// function formatDate(date) {
//   const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//   return date.toLocaleDateString(undefined, options).replace(/\//g, '-'); // Format MM-DD-YYYY
// }

// // Helper function to add days to a date
// function addDays(date, days) {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// }

// // Helper function to skip non-working days
// function skipNonWorkingDays(date, holidays) {
//   while (date.getDay() === 0 || holidays.includes(formatDate(date))) { // 0 represents Sunday
//     date = addDays(date, 1);
//   }
//   return date;
// }

// // Helper function to check if a date matches the format
// function isFormatDay(date, format) {
//   const dayOfWeek = date.getDay(); // 0: Sunday, 1: Monday, 2: Tuesday, etc.
//   if (format === 'MWF') {
//     return dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5; // Monday, Wednesday, Friday
//   } else if (format === 'TTS') {
//     return dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6; // Tuesday, Thursday, Saturday
//   }
//   return false; // Invalid format
// }

// // Function to process the input array and generate the output
// function processSchedules(inputArray, startDate, holidays, format, sessionsPerDay) {
//   let currentDate = new Date(startDate);
//   holidays = holidays.map(date => date.replace(/\//g, '-')); // Ensure holidays format is MM-DD-YYYY
//   currentDate = skipNonWorkingDays(currentDate, holidays); // Skip any Sundays or holidays in the start date
//   const outputArray = [];

//   // Helper function to assign hours to days
//   function assignHours(sessionType, hours, assignedDates) {
//     while (hours > 0) {
//       if (sessionType === 'Lecture' || sessionType === 'Judging') {
//         // Find a valid day for Lecture or Judging based on the format
//         while (!isFormatDay(currentDate, format) || holidays.includes(formatDate(currentDate))) {
//           currentDate = addDays(currentDate, 1);
//           currentDate = skipNonWorkingDays(currentDate, holidays); // Skip Sundays and holidays
//         }
//       }

//       const sessionHours = Math.min(hours, sessionsPerDay); // Assign hours based on sessionsPerDay input
//       assignedDates.push({
//         date: formatDate(currentDate),
//         day: currentDate.toLocaleDateString(undefined, { weekday: 'long' }),
//         sessionType: sessionType,
//         hours: sessionHours
//       });
//       hours -= sessionHours;
//       currentDate = addDays(currentDate, 1);
//       currentDate = skipNonWorkingDays(currentDate, holidays); // Skip Sundays and holidays
//     }
//   }

//   inputArray.forEach(item => {
//     const assignedDates = [];

//     let lectureHours = item.LectureHours;
//     let innovateHours = item.InnovateHours;

//     // Assign Lecture and Innovate hours alternately
//     while (lectureHours > 0 || innovateHours > 0) {
//       if (lectureHours > 0) {
//         assignHours('Lecture', Math.min(lectureHours, sessionsPerDay), assignedDates);
//         lectureHours -= sessionsPerDay;
//       }
//       if (innovateHours > 0) {
//         assignHours('Innovate', Math.min(innovateHours, sessionsPerDay), assignedDates);
//         innovateHours -= sessionsPerDay;
//       }
//     }

//     // Assign Judging hours after all Lecture and Innovate hours are assigned
//     if (item.JudgingHours > 0) {
//       assignHours('Judging', item.JudgingHours, assignedDates);
//     }

//     // Add the processed item with assigned dates to the output
//     outputArray.push({
//       Epic: item.Epic,
//       Name: item.Name,
//       LectureHours: item.LectureHours,
//       InnovateHours: item.InnovateHours,
//       JudgingHours: item.JudgingHours,
//       Order: item.Order,
//       Type: item.Type,
//       assignedDates: assignedDates
//     });
//   });

//   return outputArray;
// }


// async function createCohortCalendar(req, res) {
//   const cohortId = req.params.id;
//   const inputArray = req.body;

//   try {
//     const cohort = await cohorts.findByPk(cohortId);

//     if (!cohort) {
//       return res.status(404).json({ error: 'Cohort not found.' });
//     }

//     // Extract necessary fields from the cohort
//     const startDate = cohort.startdate;
//     const holidays = cohort.holidays;
//     const format = cohort.format.toUpperCase();
//     const sessionsPerDay = cohort.sessions_per_day;

//     // Call the processSchedules function with the extracted data
//     const result = processSchedules(inputArray, startDate, holidays, format, sessionsPerDay);

//     // Log the result for debugging
//     // console.log(result);

//     // Respond with the processed result
//     res.status(201).json({
//       message: 'Cohort calendar created successfully',
//       data: result,
//     });

//   } catch (error) {
//     console.error('Error creating cohort calendar:', error);
//     res.status(500).json({ error: 'An error occurred while creating the cohort calendar.' });
//   }
// }

// module.exports = createCohortCalendar;


// // start date: ymd 2024-08-02
// // holidays  ["08/13/2024", "08/15/2024"]    mdy