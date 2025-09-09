import { ERROR_MESSAGES, VALIDATION_RULES } from "../constants";
import type { ValidationRule, FieldValidationResult, ProfileData, ValidationResult } from "../types";
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