export interface Response {
  status: string;
  messages: Message[];
  data: Data;
}

export interface Data {
  inserted: number;
  duplicates: number;
  books: Book[];
}

export interface Book {
  id: number;
  title: string;
  summaries: string[];
  authors: Author[];
  translators: Author[];
  languages: string[];
  formats: Formats;
  downloadCount: number;
}

export interface Author {
  id: number;
  name: string;
  birthYear: number | null;
  deathYear: number | null;
}

export interface Formats {
  "image/jpeg"?: string;
  "application/epub+zip"?: string;
}

export interface Message {
  code: string;
  message: string;
}
