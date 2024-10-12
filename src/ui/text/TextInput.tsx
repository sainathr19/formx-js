import { forwardRef, InputHTMLAttributes, useEffect } from "react";
import { useForm } from "../../FormProvider";
interface Validator {
  validator: (value: string) => boolean;
  message: string;
}
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  validators?: Validator[];
  label?: string;
  name: string;
  id: string;
}
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, id, validators, ...props }, ref) => {
    const { formValues, registerFeild, handleChange, errors } = useForm();
    useEffect(() => {
      registerFeild(id, "");
    }, []);
    return (
      <div className="flex flex-col justify-start gap-1">
        {label && (
          <label className="w-max" htmlFor={name}>
            {label}
          </label>
        )}
        <input
          className="p-1 border border-slate-400 rounded-md outline-none"
          ref={ref}
          type="text"
          {...props}
          value={formValues[name] || ""}
          onChange={(e) => handleChange(name, e.target.value, validators)}
        />
        {errors[name] && (
          <ul className="text-left">
            {errors[name].map((err: string) => (
              <li className="text-red-600">{err}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default TextInput;
