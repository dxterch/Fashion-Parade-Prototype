const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session — MemoryStore is fine for a prototype
const MemoryStore = session.MemoryStore;
app.use(session({
  secret: process.env.SESSION_SECRET || 'fashionparade-secret-2026',
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore(),
  cookie: { secure: false }
}));
app.use(flash());

// Global template variables
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentPath = req.path;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/volunteer', require('./routes/volunteer'));
app.use('/membership', require('./routes/membership'));
app.use('/events', require('./routes/events'));
app.use('/admin', require('./routes/admin'));
app.use('/impact', require('./routes/impact'));
app.use('/resources', require('./routes/resources'));

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`🌿 Fashion Parade running at http://localhost:${PORT}`);
});

module.exports = app;
