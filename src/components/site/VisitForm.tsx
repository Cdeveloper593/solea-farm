'use client'
import { useState } from 'react'
import { bookVisit } from '@/lib/contact'

export default function VisitForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [ref, setRef] = useState('')
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setState('sending')
    const res = await bookVisit({
      name: String(fd.get('name') || ''), email: String(fd.get('email') || ''),
      date: String(fd.get('date') || ''), guests: String(fd.get('guests') || '2'),
      note: String(fd.get('note') || ''),
    })
    setRef(res.ref); setState('done')
  }
  if (state === 'done') {
    return (
      <div className="rounded-2xl border border-lemon/50 bg-cream/10 p-8 text-center" role="status">
        <p className="font-display text-3xl text-cream">Grazie — you&apos;re booked in.</p>
        <p className="mt-3 text-cream/80">We&apos;ll write to confirm your grove walk. Your reference is <strong className="text-lemon">{ref}</strong>. Wear shoes that don&apos;t mind red earth.</p>
      </div>
    )
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div><label className="field-label" htmlFor="v-name">Your name</label><input id="v-name" name="name" required autoComplete="name" className="field" placeholder="Giulia Romano" /></div>
      <div><label className="field-label" htmlFor="v-email">Email</label><input id="v-email" name="email" type="email" required autoComplete="email" className="field" placeholder="giulia@example.com" /></div>
      <div><label className="field-label" htmlFor="v-date">Preferred date</label><input id="v-date" name="date" type="date" required className="field" /></div>
      <div><label className="field-label" htmlFor="v-guests">Guests</label>
        <select id="v-guests" name="guests" className="field [&>option]:text-ink" defaultValue="2">
          {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
          <option value="7+">7+ (a group)</option>
        </select></div>
      <div className="sm:col-span-2"><label className="field-label" htmlFor="v-note">Anything we should know? <span className="normal-case tracking-normal text-cream/60">(optional)</span></label>
        <textarea id="v-note" name="note" rows={3} className="field resize-none" placeholder="Allergies, a birthday, a serious interest in marmalade…" /></div>
      <button type="submit" disabled={state === 'sending'} className="btn-primary sm:col-span-2 !bg-citrus hover:!bg-lemon hover:!text-ink disabled:opacity-60">
        {state === 'sending' ? 'Reserving…' : 'Reserve a grove visit'}
      </button>
    </form>
  )
}
