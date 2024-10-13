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

export { hasMaximumLen, hasMinimumLen, isEmail, isEmpty, isMatch };

