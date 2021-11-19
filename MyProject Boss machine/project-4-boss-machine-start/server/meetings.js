const meetApi = require('express').Router();

const { 
    getAllFromDatabase, 
    addToDatabase, 
    deleteAllFromDatabase, 
    createMeeting } = require('./db');

meetApi.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

meetApi.post('/', (req, res, next) => {
  let newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
});

meetApi.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetApi;
