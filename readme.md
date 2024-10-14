# FormX

FormX is a lightweight and flexible form handling library for React applications. It simplifies form state management, validation, and asynchronous validation with minimal boilerplate.

## Features

- Easy form state management with `useForm` hook
- Built-in synchronous and asynchronous field validation
- Customizable input components
- `FormProvider` for managing form submission and validation logic
- Debounced input changes to minimize unnecessary renders
- Custom styling support

## Installation

Install the package via npm:

```bash
npm install formx-js
```

## Basic Usage

```javascript
import * from "formx-test";
const BasicForm = () => {
  const handleSubmit = (formValues) => {
    console.log("Form Submitted with values:", formValues);
  const NameValidators = [
    {
      validator: (value: string) => value !== "",
      message: "Name cannot be empty",
    },
    {
      validator: (value: string) => value.length >= 6,
      message: "Minimum should be of 6 characters",
    },
  ];

  const EmailValidators = [
    {
      validator: async (value: string) => {
        let response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        return response.status === 200;
      },
      message: "Email already in use",
    },
  ];

  return (
    <>
      <FormProvider
        onSubmit={handleSubmit}
      >
          <TextInput
            id="first_name"
            validators={NameValidators}
            placeholder="Enter your first name"
          />
          <NumberInput
            id="age"
            minNumber={18}
            maxNumber={65}
            placeholder="Select Your Age"
            required
          />
          <EmailInput
            id="email_id"
            placeholder="Enter your email"
            validators={EmailValidators}
            debounce={1000}
          />
          <PasswordInput
            id="password"
            placeholder="Enter your password"
          />
          <TextArea
            id="feedback"
            placeholder="Let us know "
            rows={4}
            required
          />
          <SelectInput
            id="location"
            options={[
              { label: "Karnataka", value: "karnataka" },
              { label: "Goa", value: "goa" },
            ]}
            placeholder="Select a city"
          />
          <SubmitButton text="Submit" />
      </FormProvider>
    </>
  );
}

export default App;


export default BasicForm;

```


## Asynchronus Validation

The validator function can also be asynchronous if you need to perform server-side checks or other async validations.

```javascript
<TextInput
  label="Username"
  id="username"
  validators={[
    {
      validator: async (value) => {
        const res = await fetch(`/api/check-username?username=${value}`);
        const data = await res.json();
        return data.isAvailable;
      },
      message: "Username is already taken",
    },
  ]}
/>
```


## Custom Styling

You can apply custom styles to your input components by using standard React props. Use CSS classes or inline styles to achieve the desired look.

```javascript
<TextInput
  label="Custom Styled Input"
  id="custom-input"
  className="custom-input-class" // Example of applying a custom CSS class
/>
```


## Debounce

FormX includes a built-in default debounce of 300 milliseconds for handling the onChange events of input fields. This helps reduce the number of times validation is triggered while the user is typing.

```javascript
<TextInput
  label="Username"
  id="username"
  required
  debounce={500} // Custom debounce duration in milliseconds
/>
```
## Email Input

- **id**: Unique identifier for the input element, used to register the field.
- **placeholder**: Text displayed when the input is empty.
- **validators**: Array of custom validation logic:
  - **validator**: Function returning `boolean` or `Promise<boolean>`.
  - **message**: Error message displayed when validation fails.
 - **Default Validation** : The Email Input component includes built-in regex validation to ensure the email is in a valid format.

```javascript
  <EmailInput
    id="email_id"
    placeholder="Enter your email"
    validators={EmailValidators}
    debounce={1000}
  />
```

## Number Input

- **`id`**: Unique identifier for the input element.
- **`minNumber`**: Sets the minimum allowable value.
- **`maxNumber`**: Sets the maximum allowable value.
- **`placeholder`**: Placeholder text displayed when the input is empty.


```javascript
<NumberInput
    id="age"
    minNumber={18}
    maxNumber={65}
    placeholder="Select Your Age"
/>
```

## Select Input

- **`id`**: Unique identifier for the select input element.
- **`options`**: Array of objects representing the available options.
- **`placeholder`**: Placeholder text displayed when no option is selected.

```javascript
<SelectInput
  id="location"
  options={[
      { label: "Karnataka", value: "karnataka" },
      { label: "Goa", value: "goa" },
  ]}
  placeholder="Select a city"
/>
```


## Text Area

- **`id`**: Unique identifier for the textarea element.
- **`placeholder`**: Placeholder text displayed when the textarea is empty.
- **`rows`**: Number of visible text lines for the textarea.
- **`columns`**: Number of visible text columns for the textarea.
- **`required`**: Indicates whether the textarea is a required field.

```javascript
  <TextArea
    id="feedback"
    placeholder="Let us know "
    rows={4}
    required
  />
/>
```
