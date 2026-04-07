const express = require('express');
const router = express.Router();
const db = require('../middleware/db');

router.get('/', (req, res) => {
  res.render('membership/index', { title: 'Join Our Community — Fashion Parade' });
});

router.post('/join', (req, res) => {
  const { firstName, lastName, email, phone, memberType, interests, newsletter, agreeToTerms } = req.body;

  // Check if email already exists
  const existing = db.findAll('members').find(m => m.email === email);
  if (existing) {
    req.flash('error', 'This email is already registered! Try a different one or contact us.');
    return res.redirect('/membership');
  }

  const member = db.insert('members', {
    firstName,
    lastName,
    email,
    phone,
    memberType: memberType || 'community',
    interests: Array.isArray(interests) ? interests : [interests].filter(Boolean),
    newsletter: newsletter === 'on',
    agreeToTerms: agreeToTerms === 'on',
    status: 'active',
    memberSince: new Date().toISOString().split('T')[0]
  });

  res.render('membership/success', {
    title: 'Welcome to Fashion Parade!',
    member
  });
});

module.exports = router;
