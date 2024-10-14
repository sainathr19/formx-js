import { forwardRef, InputHTMLAttributes, useEffect } from "react";
import ErrorList from "../../ErrorList";
import { useForm } from "../../FormProvider";
import { isEmail } from "../../utils/validators";
interface ValidatorType {
  validator: (value: string) => Promise<boolean> | boolean;
  message: string;
}
interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  validators?: ValidatorType[];
}

const DefaultValidators: ValidatorType[] = [
  { validator: isEmail, message: "Invalid Email" },
];
const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ id, validators }, ref) => {
    const { registerFeild, handleChange, errors } = useForm();
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
          className="p-1 border border-slate-400 rounded-md"
          onChange={(e) => handleChange(id, e.target.value, validators)}
        />
        <ErrorList errors={errors[id]} />
      </div>
    );
  }
);

export default EmailInput;
