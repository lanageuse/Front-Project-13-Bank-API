import type { LoginFormData, ValidationRules } from "./types";

export const INITIAL_LOGIN_FORM_VALUE: LoginFormData = {
  email: "",
  password: "",
  remember: false,
} as const;

// Règles de validation
export const VALIDATION_RULES: ValidationRules = {
  email: {
    minLength: 2,
    maxLength: 30,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    minLength: 8,
    maxLength: 30,
    pattern: null,
  },
}  as const

// Messages d'erreur
export const ERROR_MESSAGES = {
 email: {
  required: 'Username is required',
  minLength: `Username must contain at least ${VALIDATION_RULES.email.minLength} characters`,
  maxLength: `Username cannot exceed ${VALIDATION_RULES.email.maxLength} characters`,
  pattern: 'Username contains unauthorized characters',
},
password: {
  required: 'Password is required',
  minLength: `Password must contain at least ${VALIDATION_RULES.password.minLength} characters`,
  maxLength: `Password cannot exceed ${VALIDATION_RULES.password.maxLength} characters`,
  pattern: 'Password contains unauthorized characters',
},
} as const