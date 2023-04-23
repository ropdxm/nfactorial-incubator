const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {loadTable, addTable, editTable, deleteTable, deleteProperty, addObjToTable} = require('./fsOperations');
const { sortTableByProperty } = require('./utils');

app.get('/', (req, res) => {
  res.send(loadTable(''));
})

// COMPLETED
app.get('/:tableName', (req, res) => {
  const {tableName} = req.params;
  const table = loadTable(tableName);
  if(table===-1){
    res.status(400).send('bad response');
  }
  let {sorted, filterByProperty} = req.query;
  console.log(sorted, filterByProperty, req.query);
  if(!filterByProperty){
    filterByProperty = 'id';
  }
  if(sorted){
    res.send(sortTableByProperty(tableName, filterByProperty))
  }else{
    res.send(table)
  }
})

// COMPLETED
app.put('/:tableName/:id', (req, res) => {
  try {
    const { tableName, id } = req.params;
    const newValue = req.body;
    editTable(tableName, parseInt(id), newValue);
    res.send('Table property updated successfully');
  }catch(err){
    res.status(400).send(err.message);
  }
});

// COMPLETED
app.delete('/:tableName', (req, res) => {
  const { tableName } = req.params;
  deleteTable(tableName);
  res.send('Table deleted successfully');
});

// COMPLETED
app.delete('/:tableName/:id', (req, res) => {
  try{
    const { tableName, id } = req.params;
    deleteProperty(tableName, parseInt(id));
    res.send('Property deleted successfully');
  }catch(err){
    res.status(400).json({"error": err});
  }
});

// COMPLETED
app.post('/addtable/:tableName', (req, res) => {
  const { tableName } = req.params;
  try {
    addTable(tableName);
    res.send('table added successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// COMPLETED
app.post('/addrow/:tableName/', (req, res) => {
  const {tableName} = req.params;
  const value = req.body;
  try {
    addObjToTable(tableName, value);
    res.send("Data added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))