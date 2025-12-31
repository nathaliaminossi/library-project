import { useEffect, useState } from "react"
import type { Book } from "../types/book"
import { bookService } from "../api/services/book-service";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)

  const getBooks = async () => {
    try {
      setLoading(true)
      const { data } = await bookService.findAll()
      setBooks(data.content)
    } catch (error) {
      console.error("Erro ao buscar livros:", error)
    } finally {
      setLoading(false)
    }
  }

  const addBook = (book: Book) => {
    setBooks((prev) => [book, ...prev])
  }

  const deleteBook = (idBook: string) => {
    setBooks((prev) =>
      prev.filter((b) => String((b as Book).idBook ?? b.idBook) !== idBook)
    )
  }

  const updateBook = (updated: Book) => {
    setBooks((prev) =>
      prev.map((b) =>
        String((b as Book).idBook ?? b.idBook) ===
        String((updated as Book).idBook ?? updated.idBook)
          ? updated
          : b
      )
    )
  }

  useEffect(() => {
    getBooks()
  }, [])

  return {
    books,
    loading,
    getBooks,
    addBook,
    deleteBook,
    updateBook,
  }
}
