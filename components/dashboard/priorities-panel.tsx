'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Priority } from '@/lib/types'

interface Props {
  initialPriorities: Priority[]
  userId: string
  today: string
}

export function PrioritiesPanel({ initialPriorities, userId, today }: Props) {
  const [priorities, setPriorities] = useState<Priority[]>(initialPriorities)
  const [draft, setDraft] = useState('')
  const [adding, setAdding] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleToggle(id: string, current: boolean) {
    // Optimistic update
    setPriorities((prev) =>
      prev.map((p) => (p.id === id ? { ...p, completed: !current } : p))
    )
    const supabase = createClient()
    const { error } = await supabase
      .from('priorities')
      .update({ completed: !current })
      .eq('id', id)

    if (error) {
      // Revert on failure
      setPriorities((prev) =>
        prev.map((p) => (p.id === id ? { ...p, completed: current } : p))
      )
    }
  }

  async function handleAdd() {
    const title = draft.trim()
    if (!title) return
    setAdding(true)

    const supabase = createClient()
    const { data, error } = await supabase
      .from('priorities')
      .insert({
        user_id: userId,
        title,
        date: today,
        completed: false,
        sort_order: priorities.length,
      })
      .select()
      .single()

    if (!error && data) {
      setPriorities((prev) => [...prev, data as Priority])
      setDraft('')
    }
    setAdding(false)
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-semibold text-foreground">Priorities</h2>
        {priorities.length > 0 && (
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {priorities.filter((p) => !p.completed).length} left
          </span>
        )}
      </div>

      <div>
        {priorities.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No priorities today</p>
        )}
        {priorities.map((priority) => (
          <div key={priority.id} className="flex items-center gap-3 py-3 border-b border-border/40 last:border-0">
            <button
              onClick={() => handleToggle(priority.id, !!priority.completed)}
              className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                borderColor: priority.completed ? 'var(--foreground)' : 'var(--muted-foreground)',
                backgroundColor: priority.completed ? 'var(--foreground)' : 'transparent',
              }}
              aria-label={priority.completed ? 'Mark incomplete' : 'Mark complete'}
            >
              {priority.completed && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="var(--background)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <p className={`text-sm flex-1 transition-colors ${
              priority.completed ? 'line-through text-muted-foreground' : 'text-foreground'
            }`}>
              {priority.title}
            </p>
          </div>
        ))}
      </div>

      {/* Inline add */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/40">
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a priority…"
          disabled={adding}
          className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground/50 text-foreground disabled:opacity-50"
        />
        {draft.trim() && (
          <button
            onClick={handleAdd}
            disabled={adding}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            {adding ? '…' : 'Add'}
          </button>
        )}
      </div>
    </div>
  )
}
