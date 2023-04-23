const fs = require('fs');
const { loadTable } = require('./fsOperations');

const sortTableByProperty = (tableName, property) => {
  const jsonData = loadTable(tableName);

  if (!jsonData) {
    throw new Error(`Table "${tableName}" does not exist`);
  }

  jsonData.sort((a, b) => {
    if (a[property] < b[property]) {
      return -1;
    }
    if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  });
  return jsonData;
}

module.exports = {sortTableByProperty};