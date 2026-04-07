const express = require('express');
const router = express.Router();
const db = require('../middleware/db');

// Volunteer landing page
router.get('/', (req, res) => {
  res.render('volunteer/index', { title: 'Volunteer With Us — Fashion Parade' });
});

// Multi-step form - Step 1: Personal Info
router.get('/apply', (req, res) => {
  const formData = req.session.volunteerForm || {};
  res.render('volunteer/step1', {
    title: 'Volunteer Application — Step 1',
    step: 1,
    formData
  });
});

router.post('/apply/step1', (req, res) => {
  req.session.volunteerForm = {
    ...req.session.volunteerForm,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
    pronouns: req.body.pronouns,
    instagram: req.body.instagram
  };
  res.redirect('/volunteer/apply/step2');
});

// Step 2: Skills & Interests
router.get('/apply/step2', (req, res) => {
  if (!req.session.volunteerForm?.email) return res.redirect('/volunteer/apply');
  const formData = req.session.volunteerForm || {};
  res.render('volunteer/step2', {
    title: 'Volunteer Application — Step 2',
    step: 2,
    formData
  });
});

router.post('/apply/step2', (req, res) => {
  req.session.volunteerForm = {
    ...req.session.volunteerForm,
    skills: Array.isArray(req.body.skills) ? req.body.skills : [req.body.skills].filter(Boolean),
    availability: Array.isArray(req.body.availability) ? req.body.availability : [req.body.availability].filter(Boolean),
    experience: req.body.experience,
    hoursPerMonth: req.body.hoursPerMonth
  };
  res.redirect('/volunteer/apply/step3');
});

// Step 3: Motivation & Submission
router.get('/apply/step3', (req, res) => {
  if (!req.session.volunteerForm?.email) return res.redirect('/volunteer/apply');
  const formData = req.session.volunteerForm || {};
  res.render('volunteer/step3', {
    title: 'Volunteer Application — Step 3',
    step: 3,
    formData
  });
});

router.post('/apply/submit', (req, res) => {
  if (!req.session.volunteerForm?.email) return res.redirect('/volunteer/apply');

  const formData = {
    ...req.session.volunteerForm,
    motivation: req.body.motivation,
    sustainableFashionStatement: req.body.sustainableFashionStatement,
    heardFrom: req.body.heardFrom,
    agreeToTerms: req.body.agreeToTerms === 'on',
    status: 'pending'
  };

  db.insert('volunteers', formData);
  req.session.volunteerForm = null;

  res.render('volunteer/success', {
    title: 'Application Submitted!',
    name: formData.firstName
  });
});

module.exports = router;
