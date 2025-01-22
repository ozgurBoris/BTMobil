const express = require('express');
const router = express.Router();
const { getEvents, getUserEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

// Genel etkinlik route'ları
router.route('/')
  .get(getEvents)
  .post(createEvent);

// Kullanıcıya özel etkinlikler
router.route('/user/:userId')
  .get(getUserEvents);

// Tekil etkinlik işlemleri
router.route('/:id')
  .put(updateEvent)
  .delete(deleteEvent);

module.exports = router; 