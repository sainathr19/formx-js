import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import ErrorList from "../../ErrorList";
import { useForm } from "../../FormProvider";
import { useDebounce } from "../../utils/debounce";
interface Validator {
  validator: (value: string) => boolean;
  error: string;
}

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  minLength?: number;
  maxLength?: number;
  validators?: Validator[];
  id: string;
  matchWith?: string;
  debounce?: number;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      minLength,
      maxLength,
      matchWith,
      validators,
      id,
      debounce,
      className,
      ...props
    },
    ref
  ) => {
    const { formValues, handleChange, registerFeild, errors } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      registerFeild(id, "");
    }, [id, registerFeild]);
    const debouncedHandleChange = useDebounce(
      (e: ChangeEvent<HTMLInputElement>) =>
        handleChange(id, e.target.value, validators),
      debounce || 300
    );
    return (
      <div className="flex flex-col justify-start gap-1">
        <div className="relative rounded-md border border-slate-400 overflow-hidden">
          <input
            className={`border-none outline-none pr-16 focus:ring-0 ${className}`}
            ref={ref}
            type={showPassword ? "text" : "password"}
            {...props}
            onChange={debouncedHandleChange}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-slate-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <ErrorList errors={errors[id]} />
      </div>
    );
  }
);

export default PasswordInput;
