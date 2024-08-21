const { models } = require('../../../../../db');

async function saveCohort(dataToSave) {
  return models.transactions.create(dataToSave);
}

module.exports = { saveTransactions };
