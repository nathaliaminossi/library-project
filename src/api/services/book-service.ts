import type { Book } from "../../types/book";
import baseUrl from "../config/base";





export const bookService = {
    create: (book: Book) => baseUrl.post("/book/features/create", book, {withCredentials: true}),
    findAll: () => baseUrl.get("/book/features/all", {withCredentials: true}),
    edit: (book: Partial<Book>, idBook: number) => baseUrl.patch(`/book/features/edit/${idBook}`, book, {withCredentials: true}),
}