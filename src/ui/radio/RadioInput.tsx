import React, { forwardRef } from "react";
interface RadioInputProps {
  multiple?: boolean;
  label: string;
  name: string;
}
const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({ multiple, label, name, ...props }, ref) => {
    return (
      <div ref={ref}>
        {label && <label>{label}</label>}
        <fieldset>
          <legend>Select a maintenance drone:</legend>

          <div>
            <input type="radio" id="huey" name="1" value="huey" checked />
            <label htmlFor="huey">Huey</label>
          </div>

          <div>
            <input type="radio" id="dewey" name="2" value="dewey" />
            <label htmlFor="dewey">Dewey</label>
          </div>

          <div>
            <input type="radio" id="louie" name="3" value="louie" />
            <label htmlFor="louie">Louie</label>
          </div>
        </fieldset>
      </div>
    );
  }
);

export default RadioInput;
