import { forwardRef, InputHTMLAttributes } from "react";
import { useForm } from "../../FormProvider";

interface Props extends InputHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const SubmitButton = forwardRef<HTMLButtonElement, Props>(
  ({ text, className }, ref) => {
    const { isValid, isLoading } = useForm();
    return (
      <button
        type="submit"
        ref={ref}
        className={`bg-slate-100 border border-slate-300 px-4 py-1 rounded-md w-max ${className}`}
        disabled={!isValid}
      >
        {isLoading ? "Loading.." : text}
      </button>
    );
  }
);

export default SubmitButton;
