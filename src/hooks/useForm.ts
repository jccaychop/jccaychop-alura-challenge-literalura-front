import { useState } from "react";
import type { ChangeEvent } from "react";

type UseFormReturn<T> = T & {
  formState: T;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  onResetForm: () => void;
};

export const useForm = <T extends Record<string, unknown>>(
  initialState: T,
): UseFormReturn<T> => {
  const [formState, setFormState] = useState<T>(initialState);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const target = e.target;
    const { name, value } = target;

    let newValue: unknown = value;

    if (target instanceof HTMLInputElement) {
      if (target.type === "checkbox") {
        newValue = target.checked;
      } else if (target.type === "number") {
        newValue = value === "" ? "" : Number(value);
      }
    }

    setFormState((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const onResetForm = () => {
    setFormState(initialState);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};
