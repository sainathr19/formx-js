import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const SubmitButton = forwardRef<HTMLButtonElement, Props>(({ text }, ref) => {
  return (
    <button
      type="submit"
      ref={ref}
      className="bg-slate-100 border border-slate-300 px-4 py-1 rounded-md w-max"
    >
      {text}
    </button>
  );
});

export default SubmitButton;
