import Footer from "@/components/footer";
import Header from "@/components/header";
import { getBooks } from "@/lib/books";

interface Book {
    id: number;
    title: string;
    description?: string;
    user_id?: string;
}

export const metadata = {
    title: "BOOKS — NETSPACE",
    description: "",
};

export default async function BooksPage() {
    const books: Book[] = await getBooks();

    return (
        <div>
            <Header />
            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4">Kitaplar</h1>

                {books.length === 0 ? (
                    <p>No books found.</p>
                ) : (
                    <ul className="space-y-3 mt-4">
                        {books.map((book) => (
                            <li key={book.id} className="rounded-lg shadow-sm p-3 border">
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
