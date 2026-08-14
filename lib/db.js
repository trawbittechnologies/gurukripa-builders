import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const DATABASE_URL = process.env.DATABASE_URL;

// PostgreSQL Connection Pool for Neon Serverless
let pool = null;

function getPool() {
  if (!pool && DATABASE_URL) {
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
    });
  }
  return pool;
}

// Fallback paths for file-based storage
const BUNDLED_DB_PATH = path.join(process.cwd(), 'data', 'db.json');
const BUNDLED_INQUIRIES_PATH = path.join(process.cwd(), 'data', 'inquiries.json');

// Memory Cache
let memoryDb = null;
let memoryInquiries = null;

/**
 * Fetch main site data (Company, Services, Projects, Testimonials, Hero)
 */
export async function getDbData() {
  const p = getPool();

  if (p) {
    try {
      const res = await p.query("SELECT data FROM site_data WHERE id = 'main' LIMIT 1");
      if (res.rows.length > 0 && res.rows[0].data) {
        memoryDb = res.rows[0].data;
        return memoryDb;
      }
    } catch (err) {
      console.error('Error fetching site_data from PostgreSQL:', err);
    }
  }

  // Fallback to memory cache
  if (memoryDb) return memoryDb;

  // Fallback to local bundled JSON
  try {
    if (fs.existsSync(BUNDLED_DB_PATH)) {
      const raw = fs.readFileSync(BUNDLED_DB_PATH, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb;
    }
  } catch (error) {
    console.error('Error reading fallback db.json:', error);
  }

  return null;
}

/**
 * Update main site data
 */
export async function saveDbData(data) {
  memoryDb = data;
  const p = getPool();

  if (p) {
    try {
      await p.query(`
        CREATE TABLE IF NOT EXISTS site_data (
          id VARCHAR(50) PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      await p.query(
        `
        INSERT INTO site_data (id, data, updated_at)
        VALUES ('main', $1, NOW())
        ON CONFLICT (id)
        DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();
      `,
        [data]
      );
      return true;
    } catch (err) {
      console.error('Error saving site_data to PostgreSQL:', err);
    }
  }

  // Fallback to local file if writable
  try {
    fs.writeFileSync(BUNDLED_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    return true; // memory cached
  }
}

/**
 * Fetch all client inquiries / leads
 */
export async function getInquiries() {
  const p = getPool();

  if (p) {
    try {
      const res = await p.query(
        'SELECT id, name, email, phone, service, location, budget, message, status, notes, created_at AS "createdAt" FROM inquiries ORDER BY created_at DESC'
      );
      memoryInquiries = res.rows;
      return memoryInquiries;
    } catch (err) {
      console.error('Error fetching inquiries from PostgreSQL:', err);
    }
  }

  if (memoryInquiries) return memoryInquiries;

  try {
    if (fs.existsSync(BUNDLED_INQUIRIES_PATH)) {
      const raw = fs.readFileSync(BUNDLED_INQUIRIES_PATH, 'utf-8');
      memoryInquiries = JSON.parse(raw);
      return memoryInquiries;
    }
  } catch (error) {
    console.error('Error reading fallback inquiries.json:', error);
  }

  return [];
}

/**
 * Add a new client inquiry
 */
export async function addInquiry(inquiry) {
  const id = `inq-${Date.now()}`;
  const createdAt = new Date().toISOString();
  const status = 'New';

  const newInquiry = {
    id,
    createdAt,
    status,
    ...inquiry,
  };

  const p = getPool();

  if (p) {
    try {
      await p.query(`
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

      await p.query(
        `
        INSERT INTO inquiries (id, name, email, phone, service, location, budget, message, status, notes, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
      `,
        [
          id,
          newInquiry.name,
          newInquiry.email || '',
          newInquiry.phone,
          newInquiry.service || '',
          newInquiry.location || '',
          newInquiry.budget || '',
          newInquiry.message || '',
          status,
          newInquiry.notes || '',
          new Date(createdAt),
        ]
      );
    } catch (err) {
      console.error('Error inserting inquiry into PostgreSQL:', err);
    }
  }

  // Update in-memory
  const current = memoryInquiries || [];
  memoryInquiries = [newInquiry, ...current];

  return newInquiry;
}

/**
 * Update an existing inquiry's status or notes
 */
export async function updateInquiry(id, updates) {
  const p = getPool();

  if (p) {
    try {
      const setClauses = [];
      const values = [];
      let paramIdx = 1;

      if (updates.status !== undefined) {
        setClauses.push(`status = $${paramIdx++}`);
        values.push(updates.status);
      }
      if (updates.notes !== undefined) {
        setClauses.push(`notes = $${paramIdx++}`);
        values.push(updates.notes);
      }

      if (setClauses.length > 0) {
        values.push(id);
        await p.query(
          `UPDATE inquiries SET ${setClauses.join(', ')} WHERE id = $${paramIdx}`,
          values
        );
      }
    } catch (err) {
      console.error('Error updating inquiry in PostgreSQL:', err);
    }
  }

  if (memoryInquiries) {
    memoryInquiries = memoryInquiries.map((i) =>
      i.id === id ? { ...i, ...updates } : i
    );
  }

  return true;
}

/**
 * Delete an inquiry
 */
export async function deleteInquiry(id) {
  const p = getPool();

  if (p) {
    try {
      await p.query('DELETE FROM inquiries WHERE id = $1', [id]);
    } catch (err) {
      console.error('Error deleting inquiry from PostgreSQL:', err);
    }
  }

  if (memoryInquiries) {
    memoryInquiries = memoryInquiries.filter((i) => i.id !== id);
  }

  return true;
}
