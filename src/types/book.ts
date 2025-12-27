// src/types/book.ts
export type BookStatus = "lido" | "lendo" | "quero-ler"

export interface Book {

  id: string
  title: string
  author: string
  genre: string
 
  coverUrl?: string
}
