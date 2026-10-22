// /download: descarga directa del programa más reciente (y cuenta la descarga para Stats Fluxy).
import { track } from './_track.js';
const LATEST = 'https://raw.githubusercontent.com/cristiancordova1207/TikTok-Dance-Releases/main/latest.json';

export async function onRequest({ request, waitUntil }) {
  waitUntil(track(request, 'robloxdance', 'download', request.headers.get('referer')));
  const meta = await fetch(LATEST, { cf: { cacheTtl: 120 } }).then((r) => r.json());
  const file = await fetch(meta.url);
  if (!file.ok) return Response.redirect(meta.url, 302);
  const headers = new Headers({
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename="Roblox Dance Setup.exe"',
    'Cache-Control': 'no-store',
  });
  const len = file.headers.get('content-length');
  if (len) headers.set('Content-Length', len);
  return new Response(file.body, { headers });
}
