const express = require('express');
const router = express.Router();
const db = require('../middleware/db');

router.get('/', (req, res) => {
  const volunteers    = db.findAll('volunteers');
  const members       = db.findAll('members');
  const registrations = db.findAll('registrations');
  const events        = db.findAll('events');

  // Aggregate stats
  const activeVolunteers  = volunteers.filter(v => v.status === 'active').length;
  const totalVolunteers   = volunteers.length + 70; // seed base
  const totalMembers      = members.length + 12;
  const totalRegistrations= registrations.length;
  const workshopCount     = events.filter(e => e.category === 'workshop').length;
  const totalEvents       = events.length;

  // Monthly sign-up trend (last 6 months)
  const now = new Date();
  const trend = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString('en-SG', { month: 'short', year: '2-digit' });
    const monthVols = volunteers.filter(v => {
      const c = new Date(v.createdAt);
      return c.getMonth() === d.getMonth() && c.getFullYear() === d.getFullYear();
    }).length;
    const monthMems = members.filter(m => {
      const c = new Date(m.createdAt);
      return c.getMonth() === d.getMonth() && c.getFullYear() === d.getFullYear();
    }).length;
    trend.push({ label, volunteers: monthVols, members: monthMems });
  }

  // Member tier breakdown
  const tierBreakdown = {
    community:  members.filter(m => m.memberType === 'community').length,
    collective: members.filter(m => m.memberType === 'collective').length,
    founding:   members.filter(m => m.memberType === 'founding').length
  };

  // Volunteer skill breakdown (top 6)
  const skillCounts = {};
  volunteers.forEach(v => {
    (v.skills || []).forEach(s => { skillCounts[s] = (skillCounts[s] || 0) + 1; });
  });
  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Volunteer status pipeline
  const pipeline = {
    pending:  volunteers.filter(v => v.status === 'pending').length,
    accepted: volunteers.filter(v => v.status === 'accepted').length,
    active:   activeVolunteers,
    alumni:   volunteers.filter(v => v.status === 'alumni').length
  };

  res.render('impact', {
    title: 'Impact Dashboard — Fashion Parade',
    stats: {
      totalVolunteers,
      activeVolunteers,
      totalMembers,
      totalRegistrations,
      workshopCount,
      totalEvents,
      fabricKg: 600,
      initiatives: 100
    },
    trend,
    tierBreakdown,
    topSkills,
    pipeline,
    generatedAt: new Date().toLocaleDateString('en-SG', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  });
});

module.exports = router;
