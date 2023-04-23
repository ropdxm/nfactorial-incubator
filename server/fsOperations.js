const fs = require('fs');

const dbURL="db/nosql.json";

// return json object
const loadTable = (name) => {
  const data = JSON.parse(fs.readFileSync(dbURL));
  if(name===''){
    return data;
  }
  if(data[name]){
    return data[name];
  }
  return -1;
}

const editTable = (tableName, id, newValue) => {
  const jsonData = loadTable('');
  const tableData = jsonData[tableName];
  
  const index = tableData.findIndex(obj => obj.id === id);
  if(index===-1){
    throw new Error("cannot find id");
  }
  tableData[index] = newValue;

  const updatedJson = JSON.stringify(jsonData);

  fs.writeFileSync(dbURL, updatedJson);
}

const deleteTable = (tableName) => {
  const jsonData = loadTable('');
  delete jsonData[tableName];
  fs.writeFileSync(dbURL, JSON.stringify(jsonData));
}

const deleteProperty = (tableName, id) => {
  const table = loadTable('');
  const jsonData = table[tableName];
  const index = jsonData.findIndex(obj => obj.id === id);
  if (index === -1) {
    throw new Error(`Object with id ${id} not found`);
  }
  jsonData.splice(index, 1);
  table[tableName] = jsonData;
  fs.writeFileSync(dbURL, JSON.stringify(table));
};

function addTable(tableName) {

  const jsonData = loadTable('');
  if (jsonData[tableName]) {
    throw new Error(`Table "${tableName}" already exists`);
  }

  jsonData[tableName] = [];

  fs.writeFileSync(dbURL, JSON.stringify(jsonData));
}

function addObjToTable(tableName, obj) {

  const jsonData = loadTable('');

  if (!jsonData[tableName]) {
    throw new Error(`Table "${tableName}" does not exist`);
  }

  // Add the new row to the specified table in the JSON data
  jsonData[tableName].push(obj);

  // Write the updated JSON data back to the file
  fs.writeFileSync(dbURL, JSON.stringify(jsonData));
}

module.exports = {loadTable, editTable, deleteTable, deleteProperty, addTable, addObjToTable};