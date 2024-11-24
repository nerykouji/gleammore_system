import { createClient } from "@supabase/supabase-js";
const url = "https://mtojdpnhcfhnwipnbojd.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10b2pkcG5oY2ZobndpcG5ib2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MjIxNTAsImV4cCI6MjA0NjM5ODE1MH0.jDBIqqFud5mRb7UDeXbBCUVErXpPK1U9LLXclGREPfA"
const supabase = createClient(url,key);

export default supabase;