import { STATE } from "./constants"

// Types dédiés pour l'état de authState
export type AuthState = {
  isAuthenticated: boolean
  token: string | null
  rememberMe: boolean
  status : typeof STATE[keyof typeof STATE]
}

// Types dédiés pour la réponse du endpoint login
export type LoginApiResponse = {
  body: {
    token: string
  }
  message: string
  status: number
}

// Types dédiés pour le formulaire de login
export type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
}
// Types dédiés pour la validation des champs
export type ValidateFormData = {
  email: string;
  password: string;
}

export type ValidationRule = {
  minLength: number;
  maxLength: number;
  pattern: RegExp | null;
}

export type ValidationRules = {
  email: ValidationRule;
  password: ValidationRule;
}

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
}

export type FieldValidationResult = {
  isValid: boolean;
  error?: string;
}