interface SetErrorsFunction<T> {
  (errors: (prev: T) => T): void;
}

export const validateName = <T extends { name: string }>(
  name: string,
  setErrors: React.Dispatch<React.SetStateAction<T>>
) => {
  const nameRegex = /^[\p{L}][\p{L}\s'-]*$/u;

  if (!name.trim()) {
    setErrors((prev) => ({ ...prev, name: 'Name is required' }));
  } else if (!nameRegex.test(name)) {
    setErrors((prev) => ({
      ...prev,
      name: 'Name can only contain letters',
    }));
  } else {
    setErrors((prev) => ({ ...prev, name: '' }));
  }
};

export const validateBirthDate = <T>(
  birthDate: Date | null,
  setErrors: SetErrorsFunction<T>
) => {
  const today = new Date();

  if (!birthDate) {
    setErrors((prev) => ({
      ...prev,
      birthDate: 'Your birthday date is required',
    }));
  } else if (birthDate >= today) {
    setErrors((prev) => ({
      ...prev,
      birthDate: 'Your birthday date cannot be in the future',
    }));
  } else {
    setErrors((prev) => ({ ...prev, birthDate: '' }));
  }
};

export const validateEmail = <T>(
  email: string,
  setErrors: SetErrorsFunction<T>
) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailRegex.test(email)) {
    setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
  } else {
    setErrors((prev) => ({ ...prev, email: '' }));
  }
};
