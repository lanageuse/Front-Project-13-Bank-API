import type { ValidationRules, ProfileFormData } from "./types";



export const INITIAL_PROFILE_FORM_VALUE: ProfileFormData = {
  firstName: "",
  lastName: "",
} as const

// Règles de validation
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

// Messages d'erreur
export const ERROR_MESSAGES = {
  firstName: {
    required: 'Le prénom est requis',
    minLength: `Le prénom doit contenir au moins ${VALIDATION_RULES.firstName.minLength} caractères`,
    maxLength: `Le prénom ne peut pas dépasser ${VALIDATION_RULES.firstName.maxLength} caractères`,
    pattern: 'Le prénom contient des caractères non autorisés',
  },
  lastName: {
    required: 'Le nom est requis',
    minLength: `Le nom doit contenir au moins ${VALIDATION_RULES.lastName.minLength} caractères`,
    maxLength: `Le nom ne peut pas dépasser ${VALIDATION_RULES.lastName.maxLength} caractères`,
    pattern: 'Le nom contient des caractères non autorisés',
  },
} as const