import { useEffect, useState, type FormEvent } from "react";
import clsx from "clsx";
import type {
  BookFull,
  LanguagesFromBooksResponse,
  ResponseUnion,
} from "../api/api";
import {
  apiEndpoints,
  options,
  OptionValues,
  type OptionValue,
} from "../constants/options";
import { Author, AuthorCard, AuthorTable } from "../components/authors";
import { BookCard, BookGrid, BookInfo } from "../components/books";
import { Form } from "../components/form";
import { Modal } from "../components/modals";
import { Button, LoadingSpinner, MessageBlock } from "../components/ui";
import { languageCodes } from "../constants";
import { fetchData } from "../utils";
import { endpoints } from "../api/endpoints";
import { useForm } from "../hooks";

const formData = {
  option: "",
  optionLanguage: "",
  year: new Date().getFullYear(),
};

export const ListPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modalData, setModalData] = useState<BookFull>({} as BookFull);

  const { option, optionLanguage, year, onInputChange } = useForm(formData);

  const [data, setData] = useState<ResponseUnion>({} as ResponseUnion);
  const [languageAvailable, setLanguageAvailable] =
    useState<LanguagesFromBooksResponse>({} as LanguagesFromBooksResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const url = endpoints.books.LIST_AVAILABLE_LANGUAGES;

    fetchData<LanguagesFromBooksResponse>({
      url,
      setData: setLanguageAvailable,
      setErrorMessage,
      setIsLoading,
    });
  }, []);

  useEffect(() => {
    setErrorMessage(null);
    setData({} as ResponseUnion);
  }, [option]);

  useEffect(() => {
    setErrorMessage(null);
  }, [optionLanguage]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (option === OptionValues.EMPTY) {
      setErrorMessage("Seleccione una opción");
      return;
    }

    let url = apiEndpoints[option as OptionValue];

    if (option === OptionValues.LIST_LIVING_AUTHORS_WITH_BOOKS_BY_YEAR) {
      url += year;

      if (typeof year !== "number" || isNaN(year)) {
        url = "";
        setErrorMessage("Año inválido");
      }
    }

    if (option === OptionValues.LIST_BOOKS_BY_LANGUAGE) {
      url += optionLanguage;
      if (optionLanguage === "") {
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
                  option === OptionValues.LIST_BOOKS_BY_LANGUAGE,
              },
            )}
            onSubmit={handleFormSubmit}
          >
            <select
              className="custom-select"
              id="select-option"
              name="option"
              value={option}
              onChange={onInputChange}
            >
              {options.map(([value, label]) => (
                <option className="custom-option" key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            {option === OptionValues.LIST_LIVING_AUTHORS_WITH_BOOKS_BY_YEAR && (
              <input
                className="w-full max-w-24 rounded-md border bg-white/70 px-4 py-2 outline-none"
                id="year"
                name="year"
                type="number"
                max={new Date().getFullYear()}
                value={year}
                onChange={onInputChange}
              />
            )}

            {option === OptionValues.LIST_BOOKS_BY_LANGUAGE && (
              <select
                className="custom-select"
                id="select-language-option"
                name="optionLanguage"
                value={optionLanguage}
                onChange={onInputChange}
              >
                <option className="custom-option" value={OptionValues.EMPTY}>
                  Seleccione un idioma
                </option>
                {languageAvailable.data?.languages.map((lang) => (
                  <option className="custom-option" key={lang} value={lang}>
                    {languageCodes[lang] ?? lang}
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

          {(option === OptionValues.LIST_BOOKS ||
            option === OptionValues.LIST_BOOKS_BY_LANGUAGE) &&
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

          {(option === OptionValues.LIST_AUTHORS_WITH_BOOKS ||
            option === OptionValues.LIST_LIVING_AUTHORS_WITH_BOOKS_BY_YEAR) &&
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
