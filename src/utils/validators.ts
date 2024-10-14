const isEmpty = (value : string): boolean => (value==="")

const isEmail = (email : string) : boolean => {
    const Emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return Emailregex.test(email);
}

const isMatch = (str1 : string , str2 : string) : boolean => {
    return str1===str2
}

const hasMinimumLen = (str : string , minLength : number ) => {
    return str && str.length>=minLength
}

const hasMaximumLen = (str : string , maxLength : number ) => {
    return str && str.length<=maxLength
}

const validateField = async (
    id: string,
    value: any,
    validators: ( {
        validator: (value: string) => Promise<boolean> | boolean;
        message: string;
      }
      )[]
  ): Promise<string[]> => {
    const validationResults = await Promise.all(
      validators.map(async ({ validator, message }) => {
        const isValid = await validator(value);
        return isValid ? null : message;
      })
    );
    return validationResults.filter((result) => result !== null) as string[];
  };
export { hasMaximumLen, hasMinimumLen, isEmail, isEmpty, isMatch, validateField };

