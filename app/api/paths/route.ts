import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const rows = db.prepare(
    'SELECT * FROM saved_paths ORDER BY timestamp DESC'
  ).all() as Array<Record<string, unknown>>;

  const paths = rows.map(r => ({
    id:              r.id,
    name:            r.name,
    timestamp:       r.timestamp,
    history:         JSON.parse(r.history as string),
    finalNodeId:     r.final_node_id,
    finalNodeLabel:  r.final_node_label,
    isTerminalGood:  Boolean(r.is_terminal_good),
  }));

  return NextResponse.json(paths);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const signature: string = (body.history as Array<{ fromNodeId: string; toNodeId: string }>)
    .map(h => `${h.fromNodeId}>${h.toNodeId}`)
    .join('|');
  db.prepare(`
    INSERT OR IGNORE INTO saved_paths
      (id, name, timestamp, history, final_node_id, final_node_label, is_terminal_good, signature)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    body.id,
    body.name,
    body.timestamp,
    JSON.stringify(body.history),
    body.finalNodeId,
    body.finalNodeLabel,
    body.isTerminalGood ? 1 : 0,
    signature,
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400 });
  db.prepare('DELETE FROM saved_paths WHERE id = ?').run(id);
  return NextResponse.json({ ok: true });
}
