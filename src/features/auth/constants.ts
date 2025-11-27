/**
 *  Définit toutes les constantes utilisées dans la feature auth
 */

import type { LoginFormData, ValidationRules } from "./types"

/**
 * Valeurs initiales du formulaire de connexion
 * @constant {LoginFormData} INITIAL_LOGIN_FORM_VALUE
 */
export const INITIAL_LOGIN_FORM_VALUE: LoginFormData = {
  email: "",
  password: "",
  remember: false,
} as const

/**
 * Valeurs pour le status
 * @constant {LoginFormData} INITIAL_LOGIN_FORM_VALUE
 */

export const STATE = {
  IDLE: "idle",
  SUCCESS: "success",
  LOADING: "loading",
  ERROR: "error",
} as const

/**
 * Règles de validation pour les champs du formulaire
 * @constant {ValidationRules} VALIDATION_RULES
 */
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
} as const

/**
 * Messages d'erreur pour la validation des champs
 * @constant {Object} ERROR_MESSAGES
 */
export const ERROR_MESSAGES = {
  email: {
    required: "Username is required",
    minLength: `Username must contain at least ${VALIDATION_RULES.email.minLength} characters`,
    maxLength: `Username cannot exceed ${VALIDATION_RULES.email.maxLength} characters`,
    pattern: "Username contains unauthorized characters",
  },
  password: {
    required: "Password is required",
    minLength: `Password must contain at least ${VALIDATION_RULES.password.minLength} characters`,
    maxLength: `Password cannot exceed ${VALIDATION_RULES.password.maxLength} characters`,
    pattern: "Password contains unauthorized characters",
  },
} as const
