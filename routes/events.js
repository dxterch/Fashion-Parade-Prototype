const express = require('express');
const router = express.Router();
const db = require('../middleware/db');

router.get('/', (req, res) => {
  const events = db.findAll('events');
  const { category, search } = req.query;
  let filtered = events;

  if (category && category !== 'all') {
    filtered = filtered.filter(e => e.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
    );
  }

  // Sort by date
  filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  res.render('events/index', {
    title: 'Events — Fashion Parade',
    events: filtered,
    category: category || 'all',
    search: search || ''
  });
});

router.get('/:id', (req, res) => {
  const event = db.findById('events', req.params.id);
  if (!event) {
    req.flash('error', 'Event not found.');
    return res.redirect('/events');
  }
  res.render('events/show', { title: `${event.title} — Fashion Parade`, event });
});

router.post('/:id/register', (req, res) => {
  const event = db.findById('events', req.params.id);
  if (!event) return res.redirect('/events');

  const { firstName, lastName, email, phone, dietaryNeeds, message } = req.body;

  // Check if already registered
  const registrations = db.findAll('registrations');
  const alreadyRegistered = registrations.find(r => r.eventId === req.params.id && r.email === email);
  if (alreadyRegistered) {
    req.flash('error', 'You are already registered for this event!');
    return res.redirect(`/events/${req.params.id}`);
  }

  if (event.registered >= event.capacity) {
    req.flash('error', 'Sorry, this event is fully booked.');
    return res.redirect(`/events/${req.params.id}`);
  }

  db.insert('registrations', {
    eventId: req.params.id,
    eventTitle: event.title,
    eventDate: event.date,
    firstName,
    lastName,
    email,
    phone,
    dietaryNeeds,
    message,
    status: 'confirmed'
  });

  // Update registered count
  db.updateById('events', req.params.id, { registered: event.registered + 1 });

  res.render('events/registered', {
    title: 'Registration Confirmed!',
    event,
    name: firstName
  });
});

module.exports = router;
