const express = require('express');
const minApi = express();



const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

  minApi.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
      req.minion = minion;
      next();
    } else {
      res.status(404).send();
    }
  });

  minApi.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
  });

  minApi.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
  });
  
  minApi.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
  });
  
  minApi.put('/:minionId', (req, res, next) => {
    let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinionInstance);
  });
  
  minApi.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });
  
  minApi.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
      return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
  });
  
  minApi.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
  });
  
  minApi.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
      req.work = work;
      next();
    } else {
      res.status(404).send();
    }
  });
  
  minApi.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
      res.status(400).send();
    } else {
      updatedWork = updateInstanceInDatabase('work', req.body);
      res.send(updatedWork);
    }
  });
  
  minApi.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });
  
  module.exports = minApi;