const express = require('express');
const router = express.Router();
const { 
  createProjectController,
  listProjectsController,
  listProjectByIdController,
  updateProjectByIdController,
  deleteProjectByIdController
} = require('../controllers/project.controllers');

router.post('/', createProjectController);

router.get('/', listProjectsController);

router.get('/:projectId', listProjectByIdController);

router.put('/:projectId', updateProjectByIdController);

router.delete('/:projectId', deleteProjectByIdController);

module.exports = router;