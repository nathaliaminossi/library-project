import { BookCard } from "../components/book/BookCard"
import type { Book } from "../types/book"
import { BookForm } from "../components/book/BookForm"
import { Input } from "../components/ui/input"
import { BookX, Search } from "lucide-react"
import { useState } from "react"
import { UserMenu } from "../components/userMenu"
import { FilterSelect } from "../components/filterSelect"
import { Button } from "../components/ui/button"
import { EditBookInfo } from "../components/editBookInfo"
import { Home, BookOpen, Clock, Heart, } from "lucide-react"


import Logo from '../images/logo1.png'


const book: Book = {
    id: "1",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    coverUrl: "./src/images/dom-casmuro.png",
    genre: "Clássico",
    status: "",
    edition: "",
    volume: 'string',
    publisher: "",
    category: "",
    publicationDate: "",
    image: "tring",

}





export default function Library() {
    const [filter, setFilter] = useState("")
    const [books, setBooks] = useState<Book[]>([])
    const [editingBook, setEditingBook] = useState<Book | null>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)

    const [author, setAuthor] = useState<string[]>([])
    const [title, setTitle] = useState<string[]>([])
    const [genre, setGenre] = useState<string[]>([])


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

    function handleEdit(book: Book) {
        setEditingBook(book)
        setIsEditOpen(true)
    }



    const filteredSelect = books.filter(book => {
        return (
            (author.length === 0 || author.includes(book.author)) &&
            (title.length === 0 || title.includes(book.title)) &&
            (genre.length === 0 || genre.includes(book.genre))
        )
    })


    return (

        <div className="relative min-h-screen overflow-hidden 
    bg-gradient-to-b from-indigo-950  to-[#f3ebde] bg-[#cbc5e7]">


            <header className="w-full border-b bg-via-indigo-700 px-6 py-3 sticky top-0 z-50  border-white/10 bg-indigo-950/80 backdrop-blur ">
                <div className="flex items-center justify-between gap-4">

                    {/* Logo */}
                    <div className="flex items-center gap-2 font-semibold text-lg text-neutral-50">
                        <img
                            src={Logo}
                            alt="Biblioteca Virtual"
                            className="h-7 w-7 object-contain"
                        />
                        MyLibrary
                    </div>
                    <ul className="hidden md:flex gap-6 text-sm text-white/70">
                        <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                            <Home size={16} />
                            Home
                        </li>

                        <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                            <BookOpen size={16} />
                            Lidos
                        </li>

                        <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                            <Clock size={16} />
                            Pendentes
                        </li>

                        <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                            <Heart size={16} />
                            Favoritos
                        </li>
                    </ul>


                    {/* Avatar */}
                    <UserMenu />



                </div>
            </header>


            <section className="pt-24 pb-28 text-center relative absolute inset-0 bg-gradient-to-b from-indigo-900/60 to-transparent">
                <h1 className="relative text-4xl md:text-6xl font-bold text-white">
                    Bem-vindo à sua <br />
                    <span className="text-white">Biblioteca Virtual</span>
                </h1>

                <p className="relative mt-6 text-white/70 max-w-xl mx-auto">
                    Gerencie seus livros de forma eficiente, organizada e visualmente agradável.
                </p>
            </section>


            <section className="relative z-10">
                <div className="mx-auto max-w-6xl rounded-2xl 
    bg-white/90 backdrop-blur-md shadow-xl p-6">

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        {/* Filtros */}
                        <div className="flex flex-wrap gap-3">
                            <FilterSelect label="Autor" options={["Machado de Assis", "Clarice Lispector"]} value={author} onChange={setAuthor} />
                            <FilterSelect label="Título" options={["blabla", "blble"]} value={title} onChange={setTitle} />
                            <FilterSelect label="Gênero" options={["Romance", "Terror"]} value={genre} onChange={setGenre} />
                        </div>

                        {/* Busca + botão */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Input
                                    onChange={(e) => setFilter(e.target.value)}
                                    placeholder="Buscar livro..."
                                    className="pr-9 rounded-full bg-muted/50 focus:bg-white transition"
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            </div>

                            <BookForm onAddBook={handleAddBook} />
                        </div>

                    </div>
                </div>
            </section>



            <section className="mt-16">
                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="mb-6 text-lg font-medium text-white">
                        Seus livros registrados
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
                        {filteredBooks.map(book => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onDelete={handleDeleteBook}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                    {filteredBooks.length === 0 && (
                        <div className="col-span-full text-center text-white/70 py-20">
                            <p className="text-lg text-neutral-600">   <BookX size={48} className="mx-auto mb-4 opacity-70" /> Nenhum livro encontrado!</p>
                            <p className="text-sm mt-2 text-neutral-600">Adicione seu primeiro livro para começar.</p>
                        </div>
                    )}


                </div>
            </section>




        </div>
    )
}
