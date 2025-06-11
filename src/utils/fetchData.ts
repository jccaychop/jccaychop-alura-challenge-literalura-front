type Props<T> = {
  url: string;
  setData: (value: T) => void;
  setErrorMessage: (value: string | null) => void;
  setIsLoading: (value: boolean) => void;
};

export const fetchData = async <T>({
  url,
  setData,
  setErrorMessage,
  setIsLoading,
}: Props<T>) => {
  if (!url) return;

  setIsLoading(true);
  setErrorMessage(null);
  setData({} as T);

  try {
    const response = await fetch(url);

    // Si la respuesta no es OK (status 200–299)
    if (!response.ok) {
      let message = "";

      switch (response.status) {
        case 404:
          message = "No se encontró la información solicitada (404).";
          break;
        case 500:
          message = "Error interno del servidor (500). Intenta más tarde.";
          break;
        case 401:
          message = "No estás autorizado para realizar esta acción (401).";
          break;
        case 403:
          message = "No tienes permisos para acceder a este recurso (403).";
          break;
        default:
          message = `Error ${response.status}: ${response.statusText}`;
      }

      throw new Error(message);
    }

    const result = await response.json();
    setIsLoading(false);
    setData(result);
  } catch (error) {
    console.error("Ocurrió un error al realizar la petición:", error);

    let message = "Ocurrió un error inesperado.";

    if (error instanceof TypeError && error.message === "Failed to fetch") {
      message =
        "No se pudo conectar con el servidor. Verifica tu conexión o intenta más tarde.";
    } else if (error instanceof Error) {
      message = error.message;
    }

    setIsLoading(false);
    setErrorMessage(message);
  }
};
