import { forwardRef, InputHTMLAttributes, useEffect, useMemo } from "react";
import ErrorList from "../../ErrorList";
import { useForm } from "../../FormProvider";

interface Validator {
  validator: (value: string) => boolean;
  message: string;
}

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  id: string;
  minNumber?: number;
  maxNumber?: number;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ id, required, minNumber, maxNumber, ...props }, ref) => {
    const { formValues, registerFeild, handleChange, errors } = useForm();
    useEffect(() => {
      registerFeild(id, "");
    }, []);
    const validators = useMemo(() => {
      const validationArray = [];

      if (minNumber !== undefined) {
        validationArray.push({
          validator: (value: string) => parseFloat(value) >= minNumber,
          message: `Value should be at least ${minNumber}`,
        });
      }

      if (maxNumber !== undefined) {
        validationArray.push({
          validator: (value: string) => parseFloat(value) <= maxNumber,
          message: `Value should be no more than ${maxNumber}`,
        });
      }

      return validationArray;
    }, [minNumber, maxNumber]);

    return (
      <div className="flex flex-col justify-start gap-1">
        <input
          className="p-1 border border-slate-400 rounded-md outline-none"
          ref={ref}
          type="number"
          {...props}
          value={formValues[id] || ""}
          onChange={(e) => handleChange(id, e.target.value, validators)}
        />
        <ErrorList errors={errors[id]} />
      </div>
    );
  }
);

export default NumberInput;
