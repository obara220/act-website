import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  return createSupabaseClient(
    // process.env.VITE_SUPABASE_URL!,
    // process.env.VITE_SUPABASE_ANON_KEY!
    "https://oghwsicsushfwrcdquyg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naHdzaWNzdXNoZndyY2RxdXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDQ2OTYsImV4cCI6MjA2MjcyMDY5Nn0.b9icycQ6GRxEzaSLLYQMkO8Pn-Rk9uEAJBY7X5RN62c"
  )
}
