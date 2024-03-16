
import { createClient } from '@supabase/supabase-js'
 


const supabase = createClient("https://kgnablmjvadmxmgimkze.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnbmFibG1qdmFkbXhtZ2lta3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MzEyNjAsImV4cCI6MjAyNjAwNzI2MH0.3dSf05-Qsaf9UJ2wggFZo_zv-FYpkh6CA2nMe4AASqc")

export default supabase;