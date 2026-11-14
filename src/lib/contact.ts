/** Mock visit-booking adapter — swap for a real booking API later. */
export interface VisitRequest { name: string; email: string; date: string; guests: string; note?: string }
export async function bookVisit(req: VisitRequest): Promise<{ ok: true; ref: string }> {
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true, ref: 'SOLEA-' + Math.abs([...req.email].reduce((a, c) => a + c.charCodeAt(0), 0) % 9000 + 1000) }
}
