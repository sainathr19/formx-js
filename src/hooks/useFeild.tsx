import { useEffect } from "react";
import { useForm } from "./hooks/FormProvider";
import { useDebounce } from "./utils/debounce";
interface ValidatorType {
  validator: (value: string) => Promise<boolean> | boolean;
  message: string;
}

export const useField = (
  id: string,
  initialValue: any,
  validators?: ValidatorType[],
  debounce?: number
) => {
  const { registerFeild, handleChange, getFieldValue, getFieldError } =
    useForm();
  useEffect(() => {
    registerFeild(id, initialValue);
  }, [id, initialValue, registerFeild]);
  const value = getFieldValue(id) || "";
  const error = getFieldError(id);
  const onChange = useDebounce(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      handleChange(id, e.target.value, validators || []);
    },
    debounce || 300
  );

  return {
    value,
    error,
    onChange,
  };
};
