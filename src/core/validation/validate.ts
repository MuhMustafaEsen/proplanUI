export type ValidationRules<T> = {
  [K in keyof T]?: {
    required?: boolean;
    minLength?: number;
    min?: number;
    max?: number;
    message?: string;
  };
};

export function validate<T extends Record<string, any>>(
  values: T,
  rules: ValidationRules<T>
) {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const key in rules) {
    const rule = rules[key];
    const value = values[key];

    if (!rule) continue;

    if (rule.required && (value === "" || value === undefined)) {
      errors[key] = rule.message ?? "Bu alan zorunlu";
      continue;
    }

    if (rule.minLength && value?.length < rule.minLength) {
      errors[key] = rule.message ?? `En az ${rule.minLength} karakter`;
    }

    if (rule.min !== undefined && value < rule.min) {
      errors[key] = rule.message ?? `Min ${rule.min}`;
    }

    if (rule.max !== undefined && value > rule.max) {
      errors[key] = rule.message ?? `Max ${rule.max}`;
    }
  }

  return errors;
}
