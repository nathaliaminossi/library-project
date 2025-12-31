
export type BookStatus = "lido" | "lendo" | "quero-ler"

export interface Book {

  idBook?: number
  title: string
  author: string
  edition: string
  volume: string
  publisher: string
  category: string
  publicationDate: string
  image?: string | null
  gender?: string | null
  status?: string
}
