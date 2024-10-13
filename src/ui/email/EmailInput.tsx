import { forwardRef, InputHTMLAttributes, useEffect } from "react";
import ErrorList from "../../ErrorList";
import { useForm } from "../../FormProvider";
import { isEmail } from "../../utils/validators";

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const DefaultValidators = [{ validator: isEmail, message: "Invalid Email" }];
const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ id }, ref) => {
    const { registerFeild, handleChange, errors } = useForm();
    useEffect(() => {
      registerFeild(id, "");
    }, []);
    return (
      <div className="flex flex-col gap-1">
        <input
          type="email"
          ref={ref}
          className="p-1 border border-slate-400 rounded-md"
          onChange={(e) => handleChange(id, e.target.value, DefaultValidators)}
        />
        <ErrorList errors={errors[id]} />
      </div>
    );
  }
);

export default EmailInput;
