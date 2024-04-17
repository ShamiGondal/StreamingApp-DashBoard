
import { createClient } from '@supabase/supabase-js'



const supabase = createClient("https://kgnablmjvadmxmgimkze.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnbmFibG1qdmFkbXhtZ2lta3plIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDQzMTI2MCwiZXhwIjoyMDI2MDA3MjYwfQ.WShxVrMBt2aVzR9wwGMlvHt779RWeF7X8pi_MW1YUjM")

export default supabase;