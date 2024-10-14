import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FormProviderProps {
  children: ReactNode;
}
const FormContext = createContext<{ [key: string]: any } | undefined>(
  undefined
);

interface ValidatorType {
  validator: (value: string) => Promise<boolean> | boolean;
  message: string;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [formValues, setFormValues] = useState<{
    [key: string]: any;
  }>({});
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const registerFeild = (id: string, initalValue: any) => {
    if (!(id in formValues)) {
      setFormValues((prev) => ({ ...prev, [id]: initalValue }));
    } else {
      // throw Error(`${id} has already been used , Use different id`);
    }
  };

  const handleChange = async (
    id: string,
    value: any,
    validators: ValidatorType[]
  ) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
    if (validators) {
      const validationResults = await Promise.all(
        validators.map(async ({ validator, message }) => {
          const res = await validator(value);
          return res ? null : message;
        })
      );
      const currErrors: string[] = validationResults.filter(
        (result) => result != null
      );
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
