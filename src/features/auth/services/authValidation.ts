import { ERROR_MESSAGES, VALIDATION_RULES } from "../constants";
import type { ValidationRule, FieldValidationResult, ValidationResult, ValidateFormData } from "../types";
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

  if (rules.pattern !== null && !rules.pattern.test(trimmedValue)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].pattern,
    };
  }

  return { isValid: true };
};

/**
 * Valide le username (email)
 */
export const validateEmail = (email: string): FieldValidationResult => {
  return validateField(email, VALIDATION_RULES.email, 'email');
};

/**
 * Valide le password
 */
export const validatePassword = (password: string): FieldValidationResult => {
  return validateField(password, VALIDATION_RULES.password, 'password');
};

/**
 * Valide l'ensemble du profil
 */
export const validateAuth = (data: ValidateFormData): ValidationResult => {
  const errors: string[] = [];

  const userNameResult = validateEmail(data.email);
  if (!userNameResult.isValid && userNameResult.error) {
    errors.push(userNameResult.error);
  }

  const passwordResult = validatePassword(data.password);
  if (!passwordResult.isValid && passwordResult.error) {
    errors.push(passwordResult.error);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};