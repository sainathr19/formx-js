import { forwardRef, InputHTMLAttributes } from "react";
import ErrorList from "../../ErrorList";
import { useField } from "../../useFeild";
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

let DefaultValidators: ValidatorType[] = [
  { validator: isEmail, message: "Invalid Email" },
];
const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ id, validators, debounce, className, ...props }, ref) => {
    const { error, onChange } = useField(
      id,
      "",
      DefaultValidators.concat(validators || []),
      debounce
    );
    return (
      <div className="flex flex-col gap-1">
        <input
          type="email"
          ref={ref}
          className={`p-1 border border-slate-400 rounded-md ${className}`}
          onChange={onChange}
          {...props}
        />
        <ErrorList errors={error} />
      </div>
    );
  }
);

export default EmailInput;
