const express = require('express');
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
} = require('../controllers/eventController');
const Auth = require('../middleware/authmiddleware');

const eventRouter = express.Router();

// Public routes
eventRouter.get('/', getAllEvents);
eventRouter.get('/:id', getEventById);

// Admin-only routes
eventRouter.post('/', createEvent);
eventRouter.put('/:id', Auth(['admin']), updateEvent);
eventRouter.delete('/:id', Auth(['admin']), deleteEvent);

module.exports = eventRouter;
