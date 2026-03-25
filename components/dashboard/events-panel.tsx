'use client'

import { useState } from 'react'
import { Pencil } from 'lucide-react'
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

function sortByTime(events: Event[]) {
  return [...events].sort((a, b) => {
    if (!a.event_time && !b.event_time) return 0
    if (!a.event_time) return 1
    if (!b.event_time) return -1
    return a.event_time.localeCompare(b.event_time)
  })
}

interface Props {
  initialEvents: Event[]
  userId: string
  today: string
}

export function EventsPanel({ initialEvents, userId, today }: Props) {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  function openAdd() {
    setEditingEvent(null)
    setModalOpen(true)
  }

  function openEdit(event: Event) {
    setEditingEvent(event)
    setModalOpen(true)
  }

  function handleClose() {
    setModalOpen(false)
    setEditingEvent(null)
  }

  function handleAdd(event: Event) {
    setEvents((prev) => sortByTime([...prev, event]))
  }

  function handleUpdate(updated: Event) {
    setEvents((prev) => sortByTime(prev.map((e) => (e.id === updated.id ? updated : e))))
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
        <Button size="sm" variant="ghost" onClick={openAdd}
          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
          + Add
        </Button>
      </div>

      {events.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm text-muted-foreground">No events today</p>
          <button
            onClick={openAdd}
            className="mt-2 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Add one
          </button>
        </div>
      ) : (
        <div>
          {events.map((event) => (
            <div key={event.id} className="group flex items-start gap-3 py-3 border-b border-border/40 last:border-0">
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
              <button
                onClick={() => openEdit(event)}
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                aria-label="Edit event"
              >
                <Pencil size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      <EventModal
        open={modalOpen}
        onClose={handleClose}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        userId={userId}
        today={today}
        editEvent={editingEvent}
      />
    </div>
  )
}
