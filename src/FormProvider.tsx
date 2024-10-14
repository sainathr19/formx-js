import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FormProviderProps {
  children: ReactNode;
  onSubmit?: (formValues: { [key: string]: any }) => void;
}
const FormContext = createContext<{ [key: string]: any } | undefined>(
  undefined
);

interface ValidatorType {
  validator: (value: string) => Promise<boolean> | boolean;
  message: string;
}

export const FormProvider = ({ children, onSubmit }: FormProviderProps) => {
  const [formValues, setFormValues] = useState<{
    [key: string]: any;
  }>({});
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (Object.keys(errors).some((key) => errors[key].length > 0)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

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
      setIsLoading(true);
      try {
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
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const getFieldValue = (id: string): any => {
    return formValues[id];
  };

  const getFieldError = (id: string): string[] | undefined => {
    return errors[id];
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formValues,
        registerFeild,
        handleChange,
        errors,
        isLoading,
        isValid,
        getFieldError,
        getFieldValue,
      }}
    >
      <form onSubmit={handleSubmit}>{children}</form>
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
