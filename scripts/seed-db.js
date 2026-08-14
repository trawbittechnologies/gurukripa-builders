import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set.');
  console.error('Run: DATABASE_URL=postgresql://... node scripts/seed-db.js');
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function seed() {
  console.log('Connecting to Neon PostgreSQL database...');
  const client = await pool.connect();

  try {
    console.log('Creating database tables...');

    // 1. Admin Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 2. Site Dynamic Data Table (for company profile, hero, projects, services, testimonials)
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_data (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 3. Inquiries Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(100) NOT NULL,
        service VARCHAR(255),
        location VARCHAR(255),
        budget VARCHAR(255),
        message TEXT,
        status VARCHAR(50) DEFAULT 'New',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    console.log('Tables created successfully.');

    // Seed Admin User
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'gurukripa@2026';

    await client.query(
      `
      INSERT INTO admins (username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) 
      DO UPDATE SET password = EXCLUDED.password;
    `,
      [adminUsername, adminPassword]
    );

    console.log(`Admin user seeded: username="${adminUsername}"`);

    // Read initial db.json and seed site_data
    const dbJsonPath = path.join(process.cwd(), 'data', 'db.json');
    if (fs.existsSync(dbJsonPath)) {
      const dbContent = JSON.parse(fs.readFileSync(dbJsonPath, 'utf-8'));
      await client.query(
        `
        INSERT INTO site_data (id, data, updated_at)
        VALUES ('main', $1, NOW())
        ON CONFLICT (id)
        DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();
      `,
        [dbContent]
      );
      console.log('Site content data seeded successfully from db.json.');
    }

    // Read initial inquiries.json and seed inquiries
    const inquiriesJsonPath = path.join(process.cwd(), 'data', 'inquiries.json');
    if (fs.existsSync(inquiriesJsonPath)) {
      const inquiriesList = JSON.parse(fs.readFileSync(inquiriesJsonPath, 'utf-8'));
      for (const inq of inquiriesList) {
        await client.query(
          `
          INSERT INTO inquiries (id, name, email, phone, service, location, budget, message, status, notes, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO NOTHING;
        `,
          [
            inq.id,
            inq.name,
            inq.email || '',
            inq.phone,
            inq.service || '',
            inq.location || '',
            inq.budget || '',
            inq.message || '',
            inq.status || 'New',
            inq.notes || '',
            inq.createdAt ? new Date(inq.createdAt) : new Date(),
          ]
        );
      }
      console.log(`Seeded ${inquiriesList.length} inquiries.`);
    }

    console.log('🎉 PostgreSQL Database successfully seeded!');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
