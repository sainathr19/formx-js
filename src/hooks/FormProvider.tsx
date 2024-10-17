import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { validateField } from "../utils/validators";

const FormContext = createContext<FormValuesType | undefined>(undefined);

//Form values will be object of Key i.e (id : Value) pair
interface FormValuesType {
  [key: string]: any;
}
interface FormProviderProps {
  children: ReactNode;
  onSubmit?: (formValues: FormValuesType) => void;
}

interface ValidatorType {
  validator: (value: string) => Promise<boolean> | boolean;
  message: string;
}

export const FormProvider = ({ children, onSubmit }: FormProviderProps) => {
  const [formValues, setFormValues] = useState<FormValuesType>({});
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

  //Function to Register Feild into the Context
  const registerFeild = (id: string, initalValue: any) => {
    if (!(id in formValues)) {
      setFormValues((prev) => ({ ...prev, [id]: initalValue }));
    } else {
      // throw Error(`${id} has already been used , Use different id`);
    }
  };

  //Function to Handle change in any Field
  const handleChange = async (
    id: string,
    value: any,
    validators: ValidatorType[] = []
  ) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));

    if (validators.length > 0) {
      setIsLoading(true);
      const currentErrors = await validateField(id, value, validators);
      setErrors((prev) => ({ ...prev, [id]: currentErrors }));
      setIsLoading(false);
    }
  };

  //Function to access Current Value of any Feild by Id
  const getFieldValue = (id: string): any => {
    return formValues[id];
  };

  //Function to access Errors of any Feild by Id
  const getFieldError = (id: string): string[] | undefined => {
    return errors[id];
  };

  //Invoke Onsubmit Callback on Submit
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

//Throw an Error if Context not used inside a FormProvider
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
