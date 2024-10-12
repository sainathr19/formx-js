import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type FormElementType = Record<string, any>;
interface FormProviderProps {
  children: ReactNode;
}
const FormContext = createContext<{ [key: string]: any } | undefined>(
  undefined
);

interface ValidatorType {
  validator: (value: string) => boolean;
  message: string;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [formValues, setFormValues] = useState<{
    [key: string]: any;
  }>({});
  const [renders, setRenders] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  useEffect(() => {
    setRenders((prev) => prev + 1);
    console.log(formValues);
  }, [formValues]);

  const registerFeild = (id: string, initalValue: any) => {
    if (!(id in formValues)) {
      setFormValues((prev) => ({ ...prev, [id]: initalValue }));
    } else {
      // throw Error(`${id} has already been used , Use different Name`);
    }
  };

  const handleChange = (
    id: string,
    value: any,
    validators: ValidatorType[]
  ) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
    if (validators) {
      const currErrors: string[] = validators
        .filter(({ validator }) => !validator(value))
        .map(({ message }) => message);
      if (currErrors) {
        setErrors((prev) => ({ ...prev, [id]: currErrors }));
        return;
      }
    }
  };

  return (
    <FormContext.Provider
      value={{ formValues, registerFeild, handleChange, errors }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
