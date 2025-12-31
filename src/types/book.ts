
export type BookStatus = "lido" | "lendo" | "quero-ler"

export interface Book {


  id: string
  title: string
  author: string
  edition: string
  volume: string
  publisher: string
  category: string
  publicationDate: string
  image: string
  genre: string
  coverUrl?: string
  status: string
}
