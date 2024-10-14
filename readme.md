# FormX

FormX is a lightweight and flexible form handling library for React applications. It simplifies form state management, validation, and asynchronous validation with minimal boilerplate.

## Features

- Easy form state management with `useForm` hook
- Built-in synchronous and asynchronous field validation
- Customizable input components
- `FormProvider` for managing form submission and validation logic
- Debounced input changes to minimize unnecessary renders
- Custom styling support

## Available Components

- `FormProvider`
- `TextInput`
- `EmailInput`
- `NumberInput`
- `PasswordInput`
- `SelectInput`
- `SubmitButton`

## Installation

Install the package via npm:

```bash
npm install formx-js

## Basic Usage

```javascript
import React from "react";
import { FormProvider, TextInput, SubmitButton, useForm } from "formx-test";

const BasicForm = () => {
  const handleSubmit = (formValues) => {
    console.log("Form Submitted with values:", formValues);
  };

  return (
    <FormProvider onSubmit={handleSubmit}>
      <TextInput
        id="username"
        placeholder="Enter your username"
        validators={[
          {
            validator: (value) => value.length >= 3,
            message: "Username must be at least 3 characters long",
          },
        ]}
      />
      <SubmitButton text="Submit Form" />
    </FormProvider>
  );
};

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