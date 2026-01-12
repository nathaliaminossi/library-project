import type { Label } from "../../types/label";
import baseUrl from "../config/base";





export const labelService = {
    create: (book: Label) => baseUrl.post("/label/features/create", book, {withCredentials: true}),
    findAll: () => baseUrl.get("/label/features/all", {withCredentials: true}),
    edit: (book: Partial<Label>, idLabel: number) => baseUrl.patch(`/label/features/edit/${idLabel}`, book, {withCredentials: true}),
    addLabel: (idLabel: number, idBook: number) => baseUrl.patch(`/book/features/add/${idLabel}/${idBook}`, {withCredentials: true}),
    removeLabel: (idLabel: number, idBook: number) => baseUrl.patch(`/book/features/remove/${idLabel}/${idBook}`, {withCredentials: true}),
    delete: (idLabel: number) => baseUrl.delete(`label/features/delete/${idLabel}`, {withCredentials: true})
}