const express = require('express');
const router = express.Router();
const db = require('../middleware/db');

router.get('/', (req, res) => {
  const events = db.findAll('events').slice(0, 3);
  const volunteers = db.findAll('volunteers');
  const members = db.findAll('members');
  res.render('index', {
    title: 'Fashion Parade — Gen Z Sustainable Fashion Community',
    events,
    stats: {
      volunteers: volunteers.length + 70,
      members: members.length + 600,
      initiatives: 100,
      fabric: 600
    }
  });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us — Fashion Parade' });
});

router.get('/community', (req, res) => {
  const members = db.findAll('members');
  res.render('community', { title: 'Community — Fashion Parade', members });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact — Fashion Parade' });
});

router.post('/contact', (req, res) => {
  const { name, email, purpose, message } = req.body;
  db.insert('contacts', { name, email, purpose, message });
  req.flash('success', "Thanks for reaching out! We'll get back to you soon. 🌿");
  res.redirect('/contact');
});

module.exports = router;
