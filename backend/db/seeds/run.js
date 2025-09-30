require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../../config/db');

async function runSeeds() {
  try {
    console.log('Starting database seeding...');
    
    // Read seed file
    const seedFile = path.join(__dirname, 'seed_data.sql');
    const seedSQL = fs.readFileSync(seedFile, 'utf8');
    
    // Execute seed SQL
    await pool.query(seedSQL);
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run seeds
runSeeds();