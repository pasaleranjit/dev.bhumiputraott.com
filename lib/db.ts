import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'playground.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS saved_paths (
    id               TEXT    PRIMARY KEY,
    name             TEXT    NOT NULL,
    timestamp        INTEGER NOT NULL,
    history          TEXT    NOT NULL,
    final_node_id    TEXT    NOT NULL,
    final_node_label TEXT    NOT NULL,
    is_terminal_good INTEGER NOT NULL,
    signature        TEXT    UNIQUE
  )
`);

// Migrate existing installs that predate the signature column
const cols = db.prepare("PRAGMA table_info(saved_paths)").all() as Array<{ name: string }>;
if (!cols.some(c => c.name === 'signature')) {
  db.exec('ALTER TABLE saved_paths ADD COLUMN signature TEXT');
  db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_signature ON saved_paths(signature)');
}

export default db;
