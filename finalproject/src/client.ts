import { createClient } from '@supabase/supabase-js'

const URL = 'https://vtlamixmjltwgjohisig.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0bGFtaXhtamx0d2dqb2hpc2lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMjM1MDUsImV4cCI6MjAxNTU5OTUwNX0._sCs7PLZKH84sl1mYnTBIIldGfOicJguk_6pIPoU8sY'

export const supabase = createClient(URL, API_KEY)