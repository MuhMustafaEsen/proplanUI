import { useState } from "react";
import { validate } from "../validation/validate";
import type { ValidationRules } from "../validation/validate";

export function useFormValidation<T extends Record<string, any>>(
  values: T,
  rules: ValidationRules<T>
) {
  const [errors, setErrors] =
    useState<Partial<Record<keyof T, string>>>({});

  const validateForm = () => {
    const validationErrors = validate(values, rules);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return { errors, validateForm };
}
