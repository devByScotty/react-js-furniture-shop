// config.js
const { createClient } = require('@supabase/supabase-js');

// Ensure you replace these with your actual Supabase credentials
const supabaseUrl = process.env.SUPABASE_URL; // Your Supabase project URL
const supabaseKey = process.env.SUPABASE_KEY; // Your Supabase service role key

if (!supabaseUrl || !supabaseKey) {
  throw new Error('supabaseUrl and supabaseKey are required.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
