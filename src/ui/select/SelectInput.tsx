import { forwardRef, InputHTMLAttributes } from "react";
import { useField } from "../../useFeild";
interface SelectOptionType {
  label: string;
  value: any;
}
interface SelectInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: SelectOptionType[];
  placeholder?: string;
  id: string;
}
const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ options, id, placeholder, className, defaultValue, ...props }, ref) => {
    const { onChange } = useField(id, "");

    return (
      <div className="flex flex-col gap-1">
        <select
          id={id}
          ref={ref}
          onChange={onChange}
          defaultValue={defaultValue || ""}
          {...props}
          className={`p-1 rounded-md outline-none border border-slate-400 ${className}`}
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
