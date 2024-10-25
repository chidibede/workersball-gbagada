import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qfzjrlyxwxmrkrehedlt.supabase.comm'
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase