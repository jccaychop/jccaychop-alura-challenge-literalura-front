import { useState, type ChangeEvent, type FormEvent } from "react";
import { BookCard, BookGrid, BookInfo } from "../components/books";
import { Form } from "../components/form";
import { Modal } from "../components/modals";
import { Button, LoadingSpinner, MessageBlock } from "../components/ui";
import type { BookFull, BooksByTitleResponse } from "../api/api";
import { endpoints } from "../api/endpoints";
import { fetchData } from "../utils";

export const SearchPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modalData, setModalData] = useState<BookFull>({} as BookFull);

  const [search, setSearch] = useState("");
  const [data, setData] = useState<BooksByTitleResponse>({} as BooksByTitleResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setSearch(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (search.length < 3) {
      setErrorMessage(null);
      setData({} as BooksByTitleResponse);
      setErrorMessage("El título no debe de ser menor a 3 caracteres");
      return;
    }

    const title = encodeURIComponent(search.trim().toLowerCase());
    const url = endpoints.books.SEARCH_BOOKS_BY_TITLE + title;

    fetchData<BooksByTitleResponse>({
      url,
      setData,
      setErrorMessage,
      setIsLoading,
    });
  };

  return (
    <>
      <Modal isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <BookInfo data={modalData} />
      </Modal>

      <div className="z-0 overflow-hidden">
        <div className="mx-auto flex min-h-full w-full max-w-[1400px] flex-col px-3 py-7">
          <h2 className="mb-4 text-center text-xl font-bold sm:text-2xl">
            Buscar libro por título
          </h2>

          <Form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="search"
              value={search}
              onChange={onChange}
              className="w-full max-w-md rounded-md border bg-white/70 px-4 py-2 outline-none"
            />
            <Button type="submit" disabled={isLoading}>
              BUSCAR
            </Button>
          </Form>

          <MessageBlock errorMessage={errorMessage} data={data} />

          {isLoading && <LoadingSpinner />}

          {!isLoading && data?.data != null && (
            <BookGrid>
              {data?.data?.books?.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onClick={() => {
                    setIsDialogOpen(true);
                    setModalData(book);
                  }}
                />
              ))}
            </BookGrid>
          )}
        </div>
      </div>
    </>
  );
};
