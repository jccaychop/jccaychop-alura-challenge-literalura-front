const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  books: {
    SEARCH_BOOKS_BY_TITLE: `${API_BASE_URL}/api/books/search?title=`,
    LIST_BOOKS: `${API_BASE_URL}/api/books`,
    LIST_BOOKS_BY_LANGUAGE: `${API_BASE_URL}/api/books/languages/`,
    LIST_AVAILABLE_LANGUAGES: `${API_BASE_URL}/api/books/languages`,
  },
  authors: {
    LIST_AUTHORS_WITH_BOOKS: `${API_BASE_URL}/api/authors/books`,
    LIST_LIVING_AUTHORS_WITH_BOOKS_BY_YEAR: `${API_BASE_URL}/api/authors/books?yearAlive=`,
  },
};
