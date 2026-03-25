'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Event } from '@/lib/types'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (event: Event) => void
  onUpdate: (event: Event) => void
  userId: string
  today: string
  editEvent?: Event | null
}

export function EventModal({ open, onClose, onAdd, onUpdate, userId, today, editEvent }: Props) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(today)
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEditing = !!editEvent

  useEffect(() => {
    if (open) {
      if (editEvent) {
        setTitle(editEvent.title)
        setDate(editEvent.event_date)
        setTime(editEvent.event_time?.slice(0, 5) ?? '')
        setNotes(editEvent.notes ?? '')
      } else {
        setTitle('')
        setDate(today)
        setTime('')
        setNotes('')
      }
      setError(null)
    }
  }, [open, editEvent, today])

  function handleClose() {
    onClose()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const supabase = createClient()

    if (isEditing) {
      const { data, error } = await supabase
        .from('events')
        .update({
          title: title.trim(),
          event_date: date,
          event_time: time || null,
          notes: notes.trim() || null,
        })
        .eq('id', editEvent!.id)
        .select()
        .single()

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }
      onUpdate(data as Event)
    } else {
      const { data, error } = await supabase
        .from('events')
        .insert({
          user_id: userId,
          title: title.trim(),
          event_date: date,
          event_time: time || null,
          notes: notes.trim() || null,
        })
        .select()
        .single()

      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }
      onAdd(data as Event)
    }

    onClose()
    setSaving(false)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit event' : 'Add event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="ev-title">Title</Label>
            <Input
              id="ev-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="School play, dentist…"
              required
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="ev-date">Date</Label>
              <Input
                id="ev-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-time">Time <span className="text-muted-foreground">(optional)</span></Label>
              <Input
                id="ev-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ev-notes">Notes <span className="text-muted-foreground">(optional)</span></Label>
            <Input
              id="ev-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any details…"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={saving} className="w-full sm:w-auto">
              {saving ? 'Saving…' : isEditing ? 'Save changes' : 'Add event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
