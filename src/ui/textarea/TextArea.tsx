import { forwardRef, TextareaHTMLAttributes } from "react";
import { useField } from "../../useFeild";
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
}
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, className, ...props }, ref) => {
    const { onChange } = useField(id, "");
    return (
      <textarea
        ref={ref}
        {...props}
        className={`rounded-md border border-slate-400 ${className}`}
        onChange={onChange}
      />
    );
  }
);
export default TextArea;
