import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oghwsicsushfwrcdquyg.supabase.co'; // Replace with your project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naHdzaWNzdXNoZndyY2RxdXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDQ2OTYsImV4cCI6MjA2MjcyMDY5Nn0.b9icycQ6GRxEzaSLLYQMkO8Pn-Rk9uEAJBY7X5RN62c'; // Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
