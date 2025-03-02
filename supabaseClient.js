import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zrcpbcemxcolgulecknv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyY3BiY2VteGNvbGd1bGVja252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MzM4NDEsImV4cCI6MjA1NjUwOTg0MX0.KJS2Okm6OfF0IOecMZ7fukaFODBhjMuM1HPHcCuqq48';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
