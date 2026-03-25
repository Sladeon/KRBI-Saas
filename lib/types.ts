export interface Profile {
  id: string
  display_name: string
  updated_at: string | null
}

export interface Event {
  id: string
  user_id: string
  title: string
  event_date: string        // YYYY-MM-DD
  event_time: string | null // HH:MM:SS
  notes: string | null
  created_at: string | null
}

export interface Priority {
  id: string
  user_id: string
  title: string
  date: string              // YYYY-MM-DD
  completed: boolean | null
  sort_order: number | null
  created_at: string | null
}
