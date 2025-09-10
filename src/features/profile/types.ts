export type ProfileState = {
  id: string | null
  email: string | null
  firstName: string | null
  lastName: string | null
  createdAt: string | null
  updatedAt: string | null
}

export type ProfileFormData = {
  firstName: string
  lastName: string
}

export type ProfileApiResponse = {
  body: {
    email: string
    firstName: string
    lastName: string
    createdAt: string
    updatedAt: string
    id: string
  }
  message: string
  status: number
}

export type ProfileData = {
  firstName: string;
  lastName: string;
}

export type ValidationRule = {
  minLength: number;
  maxLength: number;
  pattern: RegExp;
}

export type ValidationRules = {
  firstName: ValidationRule;
  lastName: ValidationRule;
}

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
}

export type FieldValidationResult = {
  isValid: boolean;
  error?: string;
}

//types dédié pour les transactions
export type TransactionProps = {
  title: string
  amount: number
  description: string
}