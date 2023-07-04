import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SB_LINK!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SB_KEY!;
const options = {
  auth: {
    persistSession: false,
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
