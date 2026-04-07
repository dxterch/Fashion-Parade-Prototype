const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto'); // built-in Node.js — no package needed

const DATA_DIR = path.join(__dirname, '../data');

function getFilePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readCollection(collection) {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return [];
  }
}

function writeCollection(collection, data) {
  const filePath = getFilePath(collection);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function insert(collection, record) {
  const data = readCollection(collection);
  const newRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...record
  };
  data.push(newRecord);
  writeCollection(collection, data);
  return newRecord;
}

function findAll(collection) {
  return readCollection(collection);
}

function findById(collection, id) {
  const data = readCollection(collection);
  return data.find(r => r.id === id) || null;
}

function updateById(collection, id, updates) {
  const data = readCollection(collection);
  const idx = data.findIndex(r => r.id === id);
  if (idx === -1) return null;
  data[idx] = { ...data[idx], ...updates, updatedAt: new Date().toISOString() };
  writeCollection(collection, data);
  return data[idx];
}

function deleteById(collection, id) {
  const data = readCollection(collection);
  const filtered = data.filter(r => r.id !== id);
  writeCollection(collection, filtered);
  return filtered.length < data.length;
}

// Seed events data
function seedIfEmpty() {
  const events = readCollection('events');
  if (events.length === 0) {
    const seedEvents = [
      {
        id: randomUUID(),
        title: 'Upcycling Workshop: Denim Edition',
        date: '2026-07-15',
        time: '2:00 PM - 5:00 PM',
        location: 'The Artground, Singapore',
        description: 'Learn to transform old denim into stylish new pieces! This hands-on workshop is perfect for beginners and fashion enthusiasts alike.',
        capacity: 30,
        registered: 12,
        price: 'FREE',
        category: 'workshop',
        image: '/images/event-denim.jpg',
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        title: 'GEN Z Sustainable Fashion Forum',
        date: '2026-08-02',
        time: '10:00 AM - 4:00 PM',
        location: 'National Design Centre, Singapore',
        description: 'A full-day forum bringing together Gen Z voices in sustainable fashion. Panel discussions, brand showcases and networking.',
        capacity: 150,
        registered: 67,
        price: '$5',
        category: 'forum',
        image: '/images/event-forum.jpg',
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        title: 'Thrift & Chill Market',
        date: '2026-08-23',
        time: '11:00 AM - 7:00 PM',
        location: 'Pasir Panjang Power Station',
        description: 'Our signature second-hand market featuring curated pre-loved pieces, live DJ sets and sustainability pop-ups.',
        capacity: 500,
        registered: 201,
        price: 'FREE',
        category: 'market',
        image: '/images/event-market.jpg',
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        title: 'Q3 Fashion Parade Showcase',
        date: '2026-09-20',
        time: '6:00 PM - 10:00 PM',
        location: 'Marina Bay Sands, Singapore',
        description: 'Our flagship quarterly showcase featuring upcycled collections by Fashion Parade community members and partner designers.',
        capacity: 200,
        registered: 88,
        price: '$15',
        category: 'showcase',
        image: '/images/event-showcase.jpg',
        createdAt: new Date().toISOString()
      }
    ];
    writeCollection('events', seedEvents);
  }
}

seedIfEmpty();

module.exports = { insert, findAll, findById, updateById, deleteById };
