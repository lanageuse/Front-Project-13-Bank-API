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

// Règles de validation
const VALIDATION_RULES: ValidationRules = {
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
};

// Messages d'erreur
const ERROR_MESSAGES = {
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
};

/**
 * Valide un champ selon ses règles
 */
const validateField = (
  value: string,
  rules: ValidationRule,
  fieldName: keyof typeof ERROR_MESSAGES
): FieldValidationResult => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].required,
    };
  }

  const trimmedValue = value.trim();

  if (trimmedValue.length < rules.minLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].minLength,
    };
  }

  if (trimmedValue.length > rules.maxLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].maxLength,
    };
  }

  if (!rules.pattern.test(trimmedValue)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].pattern,
    };
  }

  return { isValid: true };
};

/**
 * Valide le prénom
 */
export const validateFirstName = (firstName: string): FieldValidationResult => {
  return validateField(firstName, VALIDATION_RULES.firstName, 'firstName');
};

/**
 * Valide le nom
 */
export const validateLastName = (lastName: string): FieldValidationResult => {
  return validateField(lastName, VALIDATION_RULES.lastName, 'lastName');
};

/**
 * Valide l'ensemble du profil
 */
export const validateProfile = (data: ProfileData): ValidationResult => {
  const errors: string[] = [];

  const firstNameResult = validateFirstName(data.firstName);
  if (!firstNameResult.isValid && firstNameResult.error) {
    errors.push(firstNameResult.error);
  }

  const lastNameResult = validateLastName(data.lastName);
  if (!lastNameResult.isValid && lastNameResult.error) {
    errors.push(lastNameResult.error);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};