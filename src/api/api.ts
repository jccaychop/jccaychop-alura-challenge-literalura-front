// Mensajes de respuesta
export interface Message {
  code: string;
  message: string;
}

// Respuesta genérica
export interface ApiResponse<T = unknown> {
  status: string;
  messages: Message[];
  data: T | null;
  count: number;
}

// Persona base (Autor, Traductor)
export interface PersonBase {
  id: number;
  name: string;
  birthYear: number | null;
  deathYear: number | null;
}

// Persona con fechas obligatorias (para casos como autores vivos)
export interface PersonStrict
  extends Omit<PersonBase, "birthYear" | "deathYear"> {
  birthYear: number;
  deathYear: number;
}

// Libro básico (solo id y título)
export interface BookBase {
  id: number;
  title: string;
}

// Libro completo con todos los detalles
export interface BookFull extends BookBase {
  summaries: string[];
  authors: PersonBase[];
  translators: PersonBase[];
  languages: string[];
  formats: Formats;
  downloadCount: number;
}

// Autor con lista de libros
export interface AuthorWithBooks extends PersonBase {
  books: BookBase[];
}

// Autor con fechas obligatorias y lista de libros
export interface AuthorStrictWithBooks extends PersonStrict {
  books: BookBase[];
}

// Formatos de archivo del libro
export interface Formats {
  "image/jpeg"?: string;
  "application/epub+zip"?: string;
}

// ─────────────────────────────────────────────
// TIPOS DE RESPUESTA POR ENDPOINT
// ─────────────────────────────────────────────

// getBooksByTitle
export type BooksByTitleResponse = ApiResponse<{
  inserted: number;
  duplicates: number;
  books: BookFull[];
}>;

// getAllBooks
export type BooksResponse = ApiResponse<{
  books: BookFull[];
}>;

// getAllAuthorsWithBooks
export type AuthorsWithBooksResponse = ApiResponse<{
  authors: AuthorWithBooks[];
}>;

// getAllLanguagesFromBooks
export type LanguagesFromBooksResponse = ApiResponse<{
  languages: string[];
}>;

// getAllAuthorsAliveInYearWithBooks
export type AuthorsAliveInYearWithBooksResponse = ApiResponse<{
  authors: AuthorStrictWithBooks[];
}>;

// getAllBooksByLanguage
export type BooksByLanguageResponse = ApiResponse<{
  books: BookFull[];
}>;

export type ResponseUnion =
  | BooksByTitleResponse
  | BooksResponse
  | AuthorsWithBooksResponse
  | AuthorsAliveInYearWithBooksResponse
  | BooksByLanguageResponse;
