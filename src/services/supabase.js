import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rlyxwxmrkedlt.supabase.com/api'
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase