const ideasApi = require('express').Router();

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');
  
  const checkMillionDollarIdea = require('./checkMillionDollarIdea');
  
  ideasApi.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
      req.idea = idea;
      next();
    } else {
      res.status(404).send();
    }
  });
  
  ideasApi.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
  });
  
  ideasApi.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
  });
  
  ideasApi.get('/:id', (req, res, next) => {
    res.send(req.idea);
  });
  
  ideasApi.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    let updatedInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedInstance);
  });
  
  ideasApi.delete('/:id', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.id);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });
  
  module.exports = ideasApi;