'use client'

import { useState } from 'react'
import type { Event } from '@/lib/types'
import { EventModal } from './event-modal'
import { Button } from '@/components/ui/button'

function formatTime(time: string | null) {
  if (!time) return null
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

interface Props {
  initialEvents: Event[]
  userId: string
  today: string
}

export function EventsPanel({ initialEvents, userId, today }: Props) {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [modalOpen, setModalOpen] = useState(false)

  function handleAdd(event: Event) {
    // Insert in time order: timed events first sorted by time, then untimed
    setEvents((prev) => {
      const next = [...prev, event]
      return next.sort((a, b) => {
        if (!a.event_time && !b.event_time) return 0
        if (!a.event_time) return 1
        if (!b.event_time) return -1
        return a.event_time.localeCompare(b.event_time)
      })
    })
  }

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-foreground">Events</h2>
          {events.length > 0 && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {events.length}
            </span>
          )}
        </div>
        <Button size="sm" variant="ghost" onClick={() => setModalOpen(true)}
          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
          + Add
        </Button>
      </div>

      {events.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm text-muted-foreground">No events today</p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-2 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Add one
          </button>
        </div>
      ) : (
        <div>
          {events.map((event) => (
            <div key={event.id} className="flex items-start gap-3 py-3 border-b border-border/40 last:border-0">
              {event.event_time ? (
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md whitespace-nowrap mt-0.5">
                  {formatTime(event.event_time)}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground/50 px-2 py-1 whitespace-nowrap mt-0.5">
                  All day
                </span>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{event.title}</p>
                {event.notes && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{event.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <EventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
        userId={userId}
        today={today}
      />
    </div>
  )
}
