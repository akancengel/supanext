import { createClient } from "@/lib/supabase/server";
import { getUserBooks } from "@/lib/userBooks";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const dynamic = "force-dynamic"; // her istekte güncel veriyi getir

interface Book {
    id: string;
    title: string;
    description?: string;
    user_id?: string;
}

export default async function DashboardBooksPage() {
    const supabase = createClient();

    // Oturum açmış kullanıcıyı al
    const {
        data: { user },
    } = await (await supabase).auth.getUser();

    if (!user) {
        return (
            <div>
                <Header />
                <div className="p-6">
                    <p>Please sign in to see your books.</p>
                </div>
                <Footer />
            </div>
        );
    }

    const books: Book[] = await getUserBooks(user.id);

    return (
        <div>
            <Header />
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">My Books</h1>

                {books.length === 0 ? (
                    <p>You have no books yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {books.map((book) => (
                            <li key={book.id} className="rounded-lg shadow-sm">
                                <h2 className="font-semibold">{book.title}</h2>
                                {book.description && (
                                    <p className="text-sm text-gray-600">{book.description}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </div>
    );
}
