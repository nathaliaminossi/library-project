import { useCallback, useEffect, useState } from "react"
import type { Book } from "../types/book"
import { bookService } from "../api/services/book-service"

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState<number>(0)
  const [size] = useState<number>(10)
  const [totalPages, setTotalPages] = useState<number>(0)

  const getBooks = useCallback(
    async (currentPage = page) => {
      try {
        setLoading(true)

        const { data } = await bookService.findAll({
          page: currentPage,
          size: 8,
        })

        setBooks(data.content)
        setTotalPages(data.totalPages)
        setPage(currentPage)
      } catch (error) {
        console.error("Erro ao buscar livros:", error)
      } finally {
        setLoading(false)
      }
    },
    [page, size]
  )

  const alterPage = (direction: number) => {
    setPage((prev) => {
      const next = prev + direction

      if (next < 0 || next >= totalPages) return prev

      getBooks(next)
      return next
    })
  }

  const addBook = (book: Book) => {
    setBooks((prev) => [book, ...prev])
  }

  const deleteBook = (idBook: string) => {
    setBooks((prev) =>
      prev.filter((b) => String(b.idBook) !== idBook)
    )
  }

  const updateBook = (updated: Book) => {
    setBooks((prev) =>
      prev.map((b) =>
        String(b.idBook) === String(updated.idBook)
          ? updated
          : b
      )
    )
  }

  useEffect(() => {
    getBooks(0)
  }, [])

  return {
    books,
    loading,
    page,
    size,
    totalPages,
    alterPage,
    getBooks,
    addBook,
    deleteBook,
    updateBook,
  }
}
