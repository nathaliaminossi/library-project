import type { Book } from "../../types/book";
import baseUrl from "../config/base";





export const bookService = {
    create: (book: Book) => baseUrl.post("/book/features/create", book, {withCredentials: true}),
    findAll: (extend?: {page: number, size: number}) => baseUrl.get(`/book/features/all?page=${extend?.page ?? 0}&size=${extend?.size ?? 10}`, {withCredentials: true}),
    edit: (book: Partial<Book>, idBook: number) => baseUrl.patch(`/book/features/edit/${idBook}`, book, {withCredentials: true}),
    delete: (idBook: number) => baseUrl.delete(`book/features/delete/${idBook}`, {withCredentials: true})
}