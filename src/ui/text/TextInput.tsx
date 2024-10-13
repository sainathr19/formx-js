import { forwardRef, InputHTMLAttributes, useEffect } from "react";
import ErrorList from "../../ErrorList";
import { useForm } from "../../FormProvider";
interface Validator {
  validator: (value: string) => boolean;
  message: string;
}
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  validators?: Validator[];
  required?: boolean;
  label?: string;
  id: string;
}
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, id, validators, required, ...props }, ref) => {
    const { formValues, registerFeild, handleChange, errors } = useForm();
    useEffect(() => {
      registerFeild(id, "");
    }, []);
    return (
      <div className="flex flex-col justify-start gap-1">
        {label && <label className="w-max">{label}</label>}
        <input
          className="p-1 border border-slate-400 rounded-md outline-none"
          ref={ref}
          type="text"
          {...props}
          value={formValues[id] || ""}
          onChange={(e) => handleChange(id, e.target.value, validators)}
        />
        <ErrorList errors={errors[id]} />
      </div>
    );
  }
);

export default TextInput;
