import { ChangeEvent, forwardRef, InputHTMLAttributes, useEffect } from "react";
import ErrorList from "../../ErrorList";
import { useForm } from "../../FormProvider";
import { useDebounce } from "../../utils/debounce";
import { isEmail } from "../../utils/validators";
interface ValidatorType {
  validator: (value: string) => Promise<boolean> | boolean;
  message: string;
}
interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  validators?: ValidatorType[];
  debounce?: number;
}

const DefaultValidators: ValidatorType[] = [
  { validator: isEmail, message: "Invalid Email" },
];
const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ id, validators, debounce, className, ...props }, ref) => {
    const { registerFeild, handleChange, errors } = useForm();
    const debouncedHandleChange = useDebounce(
      (e: ChangeEvent<HTMLInputElement>) =>
        handleChange(id, e.target.value, validators),
      debounce || 300
    );
    useEffect(() => {
      registerFeild(id, "");
    }, []);
    if (validators) {
      DefaultValidators.concat(validators);
    }
    return (
      <div className="flex flex-col gap-1">
        <input
          type="email"
          ref={ref}
          className={`p-1 border border-slate-400 rounded-md ${className}`}
          onChange={debouncedHandleChange}
          {...props}
        />
        <ErrorList errors={errors[id]} />
      </div>
    );
  }
);

export default EmailInput;
