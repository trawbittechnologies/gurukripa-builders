import fs from 'fs';
import path from 'path';

// Primary bundled file paths
const BUNDLED_DB_PATH = path.join(process.cwd(), 'data', 'db.json');
const BUNDLED_INQUIRIES_PATH = path.join(process.cwd(), 'data', 'inquiries.json');

// Vercel serverless writable /tmp paths
const IS_VERCEL = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
const TMP_DIR = path.join('/tmp', 'gurukripa_data');
const TMP_DB_PATH = path.join(TMP_DIR, 'db.json');
const TMP_INQUIRIES_PATH = path.join(TMP_DIR, 'inquiries.json');

// In-memory cache for fast, seamless serverless execution
let memoryDb = null;
let memoryInquiries = null;

function ensureTmpDir() {
  if (IS_VERCEL) {
    try {
      if (!fs.existsSync(TMP_DIR)) {
        fs.mkdirSync(TMP_DIR, { recursive: true });
      }
    } catch (e) {
      // Ignore if cannot create
    }
  }
}

export function getDbData() {
  if (memoryDb) {
    return memoryDb;
  }

  try {
    // 1. Try reading from /tmp on Vercel if modified
    if (IS_VERCEL && fs.existsSync(TMP_DB_PATH)) {
      const raw = fs.readFileSync(TMP_DB_PATH, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb;
    }

    // 2. Read from bundled data directory
    if (fs.existsSync(BUNDLED_DB_PATH)) {
      const raw = fs.readFileSync(BUNDLED_DB_PATH, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb;
    }

    return null;
  } catch (error) {
    console.error('Error reading db.json:', error);
    return null;
  }
}

export function saveDbData(data) {
  try {
    memoryDb = data;

    // Try saving to local data dir (local dev)
    try {
      const localDataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(localDataDir)) fs.mkdirSync(localDataDir, { recursive: true });
      fs.writeFileSync(BUNDLED_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      // Expected in read-only Vercel serverless environment
    }

    // Also write to /tmp on Vercel
    if (IS_VERCEL) {
      ensureTmpDir();
      fs.writeFileSync(TMP_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }

    return true;
  } catch (error) {
    console.error('Error saving db.json:', error);
    return false;
  }
}

export function getInquiries() {
  if (memoryInquiries) {
    return memoryInquiries;
  }

  try {
    if (IS_VERCEL && fs.existsSync(TMP_INQUIRIES_PATH)) {
      const raw = fs.readFileSync(TMP_INQUIRIES_PATH, 'utf-8');
      memoryInquiries = JSON.parse(raw);
      return memoryInquiries;
    }

    if (fs.existsSync(BUNDLED_INQUIRIES_PATH)) {
      const raw = fs.readFileSync(BUNDLED_INQUIRIES_PATH, 'utf-8');
      memoryInquiries = JSON.parse(raw);
      return memoryInquiries;
    }

    return [];
  } catch (error) {
    console.error('Error reading inquiries.json:', error);
    return [];
  }
}

export function saveInquiries(inquiries) {
  try {
    memoryInquiries = inquiries;

    try {
      const localDataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(localDataDir)) fs.mkdirSync(localDataDir, { recursive: true });
      fs.writeFileSync(BUNDLED_INQUIRIES_PATH, JSON.stringify(inquiries, null, 2), 'utf-8');
    } catch (err) {
      // Expected on Vercel
    }

    if (IS_VERCEL) {
      ensureTmpDir();
      fs.writeFileSync(TMP_INQUIRIES_PATH, JSON.stringify(inquiries, null, 2), 'utf-8');
    }

    return true;
  } catch (error) {
    console.error('Error saving inquiries.json:', error);
    return false;
  }
}

export function addInquiry(inquiry) {
  const inquiries = getInquiries();
  const newInquiry = {
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'New',
    ...inquiry,
  };
  inquiries.unshift(newInquiry);
  saveInquiries(inquiries);
  return newInquiry;
}
