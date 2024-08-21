const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://sdndtaybijptmjadrawk.supabase.co'; // E.g., https://xyzcompany.supabase.co
const supabaseKey = 'YOUR_SUPABASE_KEYeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkbmR0YXliaWpwdG1qYWRyYXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyMjY4NjAsImV4cCI6MjAzOTgwMjg2MH0.H5PO62zZJHBDQnqFvdQuec48a3DAT76QvsCa4I4Is8s'; // Found in your Supabase dashboard under "Settings" > "API"
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
