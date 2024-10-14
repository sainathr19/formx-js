import { forwardRef, InputHTMLAttributes } from "react";
import ErrorList from "../../ErrorList";
import { useField } from "../../useFeild";

interface Validator {
  validator: (value: string) => Promise<boolean> | boolean;
  message: string;
}

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  id: string;
  minNumber?: number;
  maxNumber?: number;
  debounce?: number;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { id, required, minNumber, maxNumber, debounce, className, ...props },
    ref
  ) => {
    const validators: Validator[] = [];

    if (minNumber !== undefined) {
      validators.push({
        validator: (value: string) => parseFloat(value) >= minNumber,
        message: `Value should be at least ${minNumber}`,
      });
    }

    if (maxNumber !== undefined) {
      validators.push({
        validator: (value: string) => parseFloat(value) <= maxNumber,
        message: `Value should be no more than ${maxNumber}`,
      });
    }
    const { error, onChange } = useField(id, "", validators);

    return (
      <div className="flex flex-col justify-start gap-1">
        <input
          className={`p-1 border-2 border-slate-400 rounded-md outline-none ${className}`}
          ref={ref}
          type="number"
          {...props}
          onChange={onChange}
        />
        <ErrorList errors={error} />
      </div>
    );
  }
);

export default NumberInput;
