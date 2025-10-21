import { createClient } from "@/lib/supabase/server";

type Book = {
    id: number;
    title: string;
    // add other fields
};

let cachedData: Book[] | null = null;
let cacheTimestamp = 0;

const TTL = Number(process.env.BOOKS_CACHE_TTL_SECONDS ?? 3) * 1000;

export async function getBooks(): Promise<Book[]> {
    const now = Date.now();

    if (cachedData && now - cacheTimestamp < TTL) {
        return cachedData;
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from("books").select("*").order('id', { ascending: true });

    if (error) {
        console.error("Error fetching books:", error.message);
        return cachedData ?? [];
    }

    cachedData = (data as Book[]) || [];
    cacheTimestamp = now;
    return cachedData;
}
