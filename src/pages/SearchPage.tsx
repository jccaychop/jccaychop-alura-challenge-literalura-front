import { useState } from "react";
import { BookCard, BookGrid, BookInfo } from "../components/books";
import { Button, LoadingSpinner } from "../components/ui";
import { Modal } from "../components/modals";
import type { Book } from "../interfaces/book-response";
import dataJson from "../data/dataAPI.json";

export const SearchPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modalData, setModalData] = useState<Book>({} as Book);

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

          <form className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <input
              type="text"
              className="w-full max-w-md rounded-md border bg-white/70 px-4 py-2 outline-none"
            />
            <Button>BUSCAR</Button>
          </form>

          {/* <LoadingSpinner /> */}

          {/* messages */}
          <div className="flex justify-center gap-6 p-4">
            {dataJson.messages.map(({ message }, id) => (
              <span key={id} className="">
                {message}
              </span>
            ))}
          </div>

          <BookGrid>
            {dataJson.data.books.map((book) => (
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
        </div>
      </div>
    </>
  );
};
