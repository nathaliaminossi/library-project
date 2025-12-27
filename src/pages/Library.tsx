import { BookCard } from "../components/book/BookCard"
import type { Book } from "../types/book"
import { BookForm } from "../components/book/BookForm"
import { Input } from "../components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

const book: Book = {
    id: "1",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    coverUrl: "./src/images/dom-casmuro.png",
    genre: "Clássico",

}



export default function Library() {
    const [filter, setFilter] = useState("")
    const [books, setBooks] = useState<Book[]>([])
    const [editingBook, setEditingBook] = useState<Book | null>(null)


    const filteredBooks =
        filter !== ""
            ? books.filter(b =>
                b.title.toUpperCase().includes(filter.toUpperCase())
            )
            : books
    function handleAddBook(newBook: Book) {
        setBooks(prev => [...prev, newBook])
    }

    function handleDeleteBook(id: string) {
        setBooks(prev => prev.filter(book => book.id !== id))
    

    }

      function handleEditBook(book: Book) {
            setEditingBook(book)
        }
    return (
        <div className="p-6">
            <div className="p-5 text-3xl ">Bem-vindo á sua biblioteca!</div>

            <div className="py-1 relative  flex-1 max-w-2xl">
                <Input onChange={(e) => setFilter(e.target.value)} className=" rounded-sm" placeholder="ex: Livro" ></Input>
                <Search size={20} className="absolute right-2 top-3 text-accent-foreground/50 " />
            </div>


            <div className="p-7">
                <BookForm onAddBook={handleAddBook} />
            </div>

            <div className="p-2">Seus livros registrados.</div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
                {filteredBooks.map((book: Book) => (
                    <BookCard key={book.id} book={book}
                        onDelete={handleDeleteBook}
                        onEdit={handleEditBook  } />
                ))}
            </div>


        </div>
    )
}
