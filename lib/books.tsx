import { createClient } from "@/lib/supabase/server";

export async function getBooks() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("books").select("*");

    if (error) {
        console.error("Error fetching books:", error.message);
        return [];
    }

    return data || [];
}
