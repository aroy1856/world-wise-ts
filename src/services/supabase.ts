import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://agwgcdpqfjnzngccmibq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnd2djZHBxZmpuem5nY2NtaWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMTAyMjAsImV4cCI6MjA3Mzg4NjIyMH0.T-Lm8Lyt5bUDzPTkDzwWA43d7X86lLX84Mp6GUM9yRk";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
