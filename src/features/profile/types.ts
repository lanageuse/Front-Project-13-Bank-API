// Etat du profil stocké dans Redux
export type ProfileState = {
  id: string | null
  email: string | null
  firstName: string | null
  lastName: string | null
  createdAt: string | null
  updatedAt: string | null
}

// Données du formulaire d'édition
export type ProfileFormData = {
  firstName: string
  lastName: string
}

// Réponse API profil
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

// Données requises pour valider le formulaire
export type ProfileData = {
  firstName: string;
  lastName: string;
}

// Règle de validation
export type ValidationRule = {
  minLength: number;
  maxLength: number;
  pattern: RegExp;
}

// Ensemble des règles par champ
export type ValidationRules = {
  firstName: ValidationRule;
  lastName: ValidationRule;
}

// Résultat de validation de l'ensemble des champs
export type ValidationResult = {
  isValid: boolean;
  errors: string[];
}

// Résultat de validation d'un champ
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