import type { ValidationRules, ProfileFormData } from "./types";

// Valeurs par défaut du formulaire profil
export const INITIAL_PROFILE_FORM_VALUE: ProfileFormData = {
  firstName: "",
  lastName: "",
} as const

// Règles de validation des champs
export const VALIDATION_RULES: ValidationRules = {
  firstName: {
    minLength: 2,
    maxLength: 30,
    pattern: /^[a-zA-ZÀ-ÿ]+(?:['_\s-][a-zA-ZÀ-ÿ]+)*$/,
  },
  lastName: {
    minLength: 2,
    maxLength: 30,
    pattern: /^[a-zA-ZÀ-ÿ]+(?:['_\s-][a-zA-ZÀ-ÿ]+)*$/,
  },
}  as const

// Messages d'erreur associés aux règles
export const ERROR_MESSAGES = {
 firstName: {
  required: 'First name is required',
  minLength: `First name must contain at least ${VALIDATION_RULES.firstName.minLength} characters`,
  maxLength: `First name cannot exceed ${VALIDATION_RULES.firstName.maxLength} characters`,
  pattern: 'First name contains unauthorized characters',
},
lastName: {
  required: 'Last name is required',
  minLength: `Last name must contain at least ${VALIDATION_RULES.lastName.minLength} characters`,
  maxLength: `Last name cannot exceed ${VALIDATION_RULES.lastName.maxLength} characters`,
  pattern: 'Last name contains unauthorized characters',
},
} as const