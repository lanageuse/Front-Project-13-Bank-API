// Types dédiés pour l'état du state
export type AuthState = {
  isAuthenticated: boolean
  token: string | null
  rememberMe: boolean
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