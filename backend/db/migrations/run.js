require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../../config/db');

async function runMigrations() {
  try {
    // Create migrations table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Get all migration files
    const migrationsDir = path.join(__dirname);
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Ensure migrations run in order

    // Get already executed migrations
    const { rows: executedMigrations } = await pool.query('SELECT name FROM migrations');
    const executedMigrationNames = executedMigrations.map(row => row.name);

    // Run pending migrations
    for (const file of migrationFiles) {
      if (!executedMigrationNames.includes(file)) {
        console.log(`Running migration: ${file}`);
        
        // Read and execute migration file
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        await pool.query(sql);
        
        // Record migration as executed
        await pool.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
        
        console.log(`Migration ${file} completed successfully`);
      } else {
        console.log(`Migration ${file} already executed, skipping`);
      }
    }

    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run migrations
runMigrations();