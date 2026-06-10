/* eslint-disable */
/**
 * Build public/ProjectsData/projects.json from the per-project slug files.
 *
 * Single source of truth: you only ever hand-edit `<slug>.json`. This script
 * scans that folder, pulls the list/rail metadata out of each project, sorts by
 * the `order` field, and writes the index. Runs automatically on prestart /
 * prebuild — do not hand-edit projects.json, it gets overwritten.
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'public', 'ProjectsData');
const OUT_FILE = path.join(DATA_DIR, 'projects.json');

// fields the list page (/projects), home page, and detail rail need
const INDEX_FIELDS = ['image', 'title', 'tagline', 'year', 'role', 'description', 'skillset'];

const slugFromFile = (file) => path.basename(file, '.json');

const files = fs
  .readdirSync(DATA_DIR)
  .filter((f) => f.endsWith('.json') && f !== 'projects.json');

const projects = files.map((file) => {
  const full = path.join(DATA_DIR, file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (e) {
    throw new Error(`Invalid JSON in ${file}: ${e.message}`);
  }

  // slug = explicit field if set, else the filename (the URL is /projects/<slug>)
  const slug = data.slug || slugFromFile(file);

  const entry = { slug };
  for (const key of INDEX_FIELDS) {
    if (data[key] !== undefined) entry[key] = data[key];
  }
  // fall back to thumbnail for the card image, technologies for skillset
  if (entry.image === undefined && data.thumbnail) entry.image = data.thumbnail;
  if (entry.skillset === undefined && data.technologies) entry.skillset = data.technologies;
  if (entry.description === undefined && data.summary) entry.description = data.summary;

  entry._order = typeof data.order === 'number' ? data.order : Number.POSITIVE_INFINITY;
  return entry;
});

// stable sort by order, then title for ties / missing order
projects.sort((a, b) => a._order - b._order || String(a.title).localeCompare(String(b.title)));
projects.forEach((p) => delete p._order);

fs.writeFileSync(OUT_FILE, JSON.stringify(projects, null, 2) + '\n');
console.log(`[projects-index] wrote ${projects.length} projects → ${path.relative(process.cwd(), OUT_FILE)}`);
