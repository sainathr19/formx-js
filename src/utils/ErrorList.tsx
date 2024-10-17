import { Key } from "react";

interface ErrorListProps {
  errors: string[];
}
const ErrorList = ({ errors }: ErrorListProps) => {
  if (!errors) return null;
  return (
    <ul className="text-left">
      {errors.map((err: string, index: Key) => (
        <li key={index} className="text-red-600">
          {err}
        </li>
      ))}
    </ul>
  );
};

export default ErrorList;
