import { createClient } from '@/lib/supabase/server'
import type { Event, Priority } from '@/lib/types'
import { EventsPanel } from '@/components/dashboard/events-panel'
import { PrioritiesPanel } from '@/components/dashboard/priorities-panel'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const today = new Date().toISOString().split('T')[0]

  const [{ data: events }, { data: priorities }] = await Promise.all([
    supabase
      .from('events')
      .select('*')
      .eq('user_id', user!.id)
      .eq('event_date', today)
      .order('event_time', { ascending: true, nullsFirst: false }),
    supabase
      .from('priorities')
      .select('*')
      .eq('user_id', user!.id)
      .eq('date', today)
      .order('sort_order', { ascending: true }),
  ])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Today</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EventsPanel
          initialEvents={(events ?? []) as Event[]}
          userId={user!.id}
          today={today}
        />
        <PrioritiesPanel
          initialPriorities={(priorities ?? []) as Priority[]}
          userId={user!.id}
          today={today}
        />
      </div>
    </div>
  )
}
