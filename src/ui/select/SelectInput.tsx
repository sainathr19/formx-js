import { forwardRef, useEffect } from "react";
import { useForm } from "../../FormProvider";
interface SelectOptionType {
  label: string;
  value: any;
}
interface SelectInputProps {
  options: SelectOptionType[];
  placeholder?: string;
  id: string;
}
const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ options, id, placeholder }, ref) => {
    const { formValues, registerFeild, handleChange } = useForm();
    useEffect(() => {
      registerFeild(id, "");
    }, []);
    return (
      <div className="flex flex-col gap-1">
        <select
          id={id}
          ref={ref}
          onChange={(e) => handleChange(id, e.target.value)}
          value={formValues[id] || ""}
          className="p-1 rounded-md"
        >
          {placeholder && (
            <option disabled value={""}>
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
