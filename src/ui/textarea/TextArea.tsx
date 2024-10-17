import { forwardRef, TextareaHTMLAttributes } from "react";
import { useField } from "../../hooks/useFeild";
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  debounce?: number;
}
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, className, debounce, ...props }, ref) => {
    const { onChange } = useField(id, "", [], debounce);
    return (
      <textarea
        ref={ref}
        {...props}
        className={`rounded-md border border-slate-400 outline-none p-1 ${className}`}
        onChange={onChange}
      />
    );
  }
);
export default TextArea;
