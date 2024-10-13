import { forwardRef, InputHTMLAttributes, MouseEventHandler } from "react";

interface Props extends InputHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ onClick, text }, ref) => {
    return (
      <button
        onClick={onClick}
        ref={ref}
        className="bg-slate-100 border border-slate-300 px-4 py-1 rounded-md w-max"
      >
        {text}
      </button>
    );
  }
);

export default Button;
