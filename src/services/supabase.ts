import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://agwgcdpqfjnzngccmibq.supabase.co";
const supabaseKey = "Fill your api key";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
