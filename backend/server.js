require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool } = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const animalRoutes = require('./routes/animals');
const calfRoutes = require('./routes/calves');
const vetRoutes = require('./routes/vets');
const healthRecordRoutes = require('./routes/healthRecords');
const cropRoutes = require('./routes/crops');
const inventoryRoutes = require('./routes/inventory');
const salesRoutes = require('./routes/sales');
const expenseRoutes = require('./routes/expenses');
const reportRoutes = require('./routes/reports');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/calves', calfRoutes);
app.use('/api/vets', vetRoutes);
app.use('/api/health-records', healthRecordRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Test database connection
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Database connection error:', err.stack);
    } else {
      console.log('Database connected successfully');
    }
  });
});

module.exports = app; // For testing