import { forwardRef, useEffect } from "react";
import { useForm } from "../../FormProvider";
interface SelectOptionType {
  label: string;
  value: any;
}
interface SelectInputProps {
  label?: string;
  name: string;
  options: SelectOptionType[];
  placeholder?: string;
  id: string;
}
const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ name, label, options, id, placeholder, ...props }, ref) => {
    const { formValues, registerFeild, handleChange } = useForm();
    useEffect(() => {
      registerFeild(id, "");
    }, []);
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="w-max" htmlFor={label}>
            {label}
          </label>
        )}
        <select
          name={name}
          id={name}
          ref={ref}
          onChange={(e) => handleChange(name, e.target.value)}
          value={formValues[name] || ""}
          className="p-1 rounded-md"
        >
          {placeholder && (
            <option disabled value="">
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SelectInput;
