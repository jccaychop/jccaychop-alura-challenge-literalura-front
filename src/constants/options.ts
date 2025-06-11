import { endpoints } from "../api/endpoints";

const { authors, books } = endpoints;

export const OptionValues = {
  EMPTY: "",
  LIST_BOOKS: "list_books",
  LIST_AUTHORS_WITH_BOOKS: "list_authors",
  LIST_LIVING_AUTHORS_WITH_BOOKS_BY_YEAR: "list_living_authors_by_year",
  LIST_BOOKS_BY_LANGUAGE: "list_books_by_language",
} as const;

export type OptionValue = (typeof OptionValues)[keyof typeof OptionValues];

export const options: [OptionValue, string][] = [
  [OptionValues.EMPTY, "Seleccione una opción"],
  [OptionValues.LIST_BOOKS, "Libros registrados"],
  [OptionValues.LIST_AUTHORS_WITH_BOOKS, "Autores registrados"],
  [OptionValues.LIST_LIVING_AUTHORS_WITH_BOOKS_BY_YEAR, "Autores vivos (año)"],
  [OptionValues.LIST_BOOKS_BY_LANGUAGE, "Libros por idioma"],
];

export const apiEndpoints: Record<OptionValue, string> = {
  [OptionValues.EMPTY]: "",
  [OptionValues.LIST_BOOKS]: books.LIST_BOOKS,
  [OptionValues.LIST_AUTHORS_WITH_BOOKS]: authors.LIST_AUTHORS_WITH_BOOKS,
  [OptionValues.LIST_LIVING_AUTHORS_WITH_BOOKS_BY_YEAR]: authors.LIST_LIVING_AUTHORS_WITH_BOOKS_BY_YEAR,
  [OptionValues.LIST_BOOKS_BY_LANGUAGE]: books.LIST_BOOKS_BY_LANGUAGE,
};
