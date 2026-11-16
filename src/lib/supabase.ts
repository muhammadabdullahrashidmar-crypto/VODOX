import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cwctravnzgfykxqejibf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3Y3RyYXZuemdmeWt4cWVqaWJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4MjAxMTQsImV4cCI6MjExMDM5NjExNH0.g4TlKQPlz6qy2qxCR3xHK9DzT8t2Fu49NwqyKR-2v28';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
