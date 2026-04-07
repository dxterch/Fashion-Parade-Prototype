const express = require('express');
const router = express.Router();
const db = require('../middleware/db');

// Simple admin auth middleware
function requireAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.redirect('/admin/login');
}

router.get('/login', (req, res) => {
  res.render('admin/login', { title: 'Admin Login — Fashion Parade' });
});

router.post('/login', (req, res) => {
  const { password } = req.body;
  // In production, use proper auth. This is a demo password.
  if (password === (process.env.ADMIN_PASSWORD || 'fashionparade2026')) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    req.flash('error', 'Incorrect password.');
    res.redirect('/admin/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.isAdmin = false;
  res.redirect('/admin/login');
});

router.get('/', requireAdmin, (req, res) => {
  const volunteers = db.findAll('volunteers');
  const members = db.findAll('members');
  const registrations = db.findAll('registrations');
  const contacts = db.findAll('contacts');
  const events = db.findAll('events');

  res.render('admin/dashboard', {
    title: 'Admin Dashboard — Fashion Parade',
    stats: {
      volunteers: volunteers.length,
      members: members.length,
      registrations: registrations.length,
      contacts: contacts.length,
      events: events.length,
      pendingVolunteers: volunteers.filter(v => v.status === 'pending').length
    },
    recentVolunteers: volunteers.slice(-5).reverse(),
    recentMembers: members.slice(-5).reverse(),
    recentRegistrations: registrations.slice(-5).reverse()
  });
});

router.get('/volunteers', requireAdmin, (req, res) => {
  const volunteers = db.findAll('volunteers').reverse();
  res.render('admin/volunteers', { title: 'Volunteers — Admin', volunteers });
});

router.post('/volunteers/:id/status', requireAdmin, (req, res) => {
  db.updateById('volunteers', req.params.id, { status: req.body.status });
  req.flash('success', 'Volunteer status updated!');
  res.redirect('/admin/volunteers');
});

router.get('/members', requireAdmin, (req, res) => {
  const members = db.findAll('members').reverse();
  res.render('admin/members', { title: 'Members — Admin', members });
});

router.get('/registrations', requireAdmin, (req, res) => {
  const registrations = db.findAll('registrations').reverse();
  res.render('admin/registrations', { title: 'Event Registrations — Admin', registrations });
});

router.get('/events', requireAdmin, (req, res) => {
  const events = db.findAll('events').reverse();
  res.render('admin/events', { title: 'Events — Admin', events });
});

router.post('/events/add', requireAdmin, (req, res) => {
  const { title, date, time, location, description, capacity, price, category } = req.body;
  db.insert('events', {
    title, date, time, location, description,
    capacity: parseInt(capacity),
    registered: 0,
    price, category,
    image: '/images/event-default.jpg'
  });
  req.flash('success', 'Event created successfully!');
  res.redirect('/admin/events');
});

router.post('/events/:id/delete', requireAdmin, (req, res) => {
  db.deleteById('events', req.params.id);
  req.flash('success', 'Event deleted.');
  res.redirect('/admin/events');
});

router.get('/contacts', requireAdmin, (req, res) => {
  const contacts = db.findAll('contacts').reverse();
  res.render('admin/contacts', { title: 'Contact Messages — Admin', contacts });
});

module.exports = router;
