import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import clsx from "clsx";
import type {
  BookFull,
  LanguagesFromBooksResponse,
  ResponseUnion,
} from "../api/api";
import { Author, AuthorCard, AuthorTable } from "../components/authors";
import { BookCard, BookGrid, BookInfo } from "../components/books";
import { Form } from '../components/form';
import { Modal } from "../components/modals";
import { Button, LoadingSpinner, MessageBlock } from "../components/ui";
import {
  apiEndpoints,
  options,
  OptionValues,
  type OptionValue,
} from "../constants/options";
import { languageCodes } from "../constants";
import { fetchData } from "../utils";
import { endpoints } from "../api/endpoints";

export const ListPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modalData, setModalData] = useState<BookFull>({} as BookFull);

  const [data, setData] = useState<ResponseUnion>({} as ResponseUnion);
  const [languageAvailable, setLanguageAvailable] = useState<LanguagesFromBooksResponse>({} as LanguagesFromBooksResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedOption, setSelectedOption] = useState<OptionValue>(OptionValues.EMPTY);

  const [selectedLanguageOption, setSelectedLanguageOption] = useState<string>("");

  // input year
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number | "">(currentYear);
  const minYear = 100;

  useEffect(() => {
    const url = endpoints.books.LIST_AVAILABLE_LANGUAGES;

    fetchData<LanguagesFromBooksResponse>({
      url,
      setData: setLanguageAvailable,
      setErrorMessage,
      setIsLoading,
    });
  }, []);

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    if (isNaN(value)) {
      setYear("");
    } else {
      setYear(value);
    }
  };

  const handleSelectOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value as OptionValue);
    setErrorMessage(null);
    setData({} as ResponseUnion);
  };

  const handleSelectLanguageOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguageOption(e.target.value);
    setErrorMessage(null);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (selectedOption === OptionValues.EMPTY) return;

    let url = apiEndpoints[selectedOption];

    if (
      selectedOption === OptionValues.LIST_LIVING_AUTHORS_WITH_BOOKS_BY_YEAR
    ) {
      url += year;
    }

    if (selectedOption === OptionValues.LIST_BOOKS_BY_LANGUAGE) {
      url += selectedLanguageOption;
      if (selectedLanguageOption === "") {
        url = "";
        setErrorMessage("Seleccione un idioma");
      }
    }

    fetchData<ResponseUnion>({
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

      <div className="z-0">
        <div className="mx-auto flex min-h-full w-full max-w-[1400px] flex-col px-3 py-7">
          <h2 className="mb-4 text-center text-xl font-bold sm:text-2xl">
            Listar libros / autores
          </h2>

          <Form
            className={clsx(
              "flex flex-wrap items-center justify-center gap-4",
              {
                "flex-col md:flex-row":
                  selectedOption === OptionValues.LIST_BOOKS_BY_LANGUAGE,
              },
            )}
            onSubmit={handleFormSubmit}
          >
            <select
              className="custom-select"
              id="select-option"
              name="option"
              onChange={handleSelectOnChange}
            >
              {options.map(([value, label]) => (
                <option className="custom-option" key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            {selectedOption ===
              OptionValues.LIST_LIVING_AUTHORS_WITH_BOOKS_BY_YEAR && (
              <input
                className="w-full max-w-24 rounded-md border bg-white/70 px-4 py-2 outline-none"
                id="year"
                type="number"
                min={minYear}
                max={currentYear}
                value={year}
                onChange={handleChangeYear}
              />
            )}

            {selectedOption === OptionValues.LIST_BOOKS_BY_LANGUAGE && (
              <select
                className="custom-select"
                id="select-language-option"
                name="option-language"
                onChange={handleSelectLanguageOnChange}
              >
                <option className="custom-option" value={OptionValues.EMPTY}>
                  Seleccione un idioma
                </option>
                {languageAvailable.data?.languages.map((lang) => (
                  <option className="custom-option" key={lang} value={lang}>
                    {languageCodes[lang]}
                  </option>
                ))}
              </select>
            )}

            <Button type="submit" disabled={isLoading}>
              LISTAR
            </Button>
          </Form>

          <MessageBlock errorMessage={errorMessage} data={data} />

          {isLoading && <LoadingSpinner />}

          {(selectedOption === OptionValues.LIST_BOOKS ||
            selectedOption === OptionValues.LIST_BOOKS_BY_LANGUAGE) &&
            !isLoading &&
            data?.data != null &&
            "books" in data.data && (
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

          {(selectedOption === OptionValues.LIST_AUTHORS_WITH_BOOKS ||
            selectedOption ===
              OptionValues.LIST_LIVING_AUTHORS_WITH_BOOKS_BY_YEAR) &&
            !isLoading &&
            data?.data != null &&
            "authors" in data.data && (
              <Author>
                <AuthorCard authors={data.data.authors} />
                <AuthorTable authors={data.data.authors} />
              </Author>
            )}
        </div>
      </div>
    </>
  );
};
