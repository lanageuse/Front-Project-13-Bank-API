import { ERROR_MESSAGES, VALIDATION_RULES } from "../constants";
import type { ValidationRule, FieldValidationResult, ValidationResult, ValidateFormData } from "../types";

/**
 * Fonction générique de validation d'un champ de formulaire
 * 
 * @param value - La valeur du champ à valider
 * @param rules - Les règles de validation à appliquer (minLength, maxLength, pattern)
 * @param fieldName - Le nom du champ pour récupérer les messages d'erreur appropriés
 * @returns Un objet contenant l'état de validation et le message d'erreur éventuel
 */
const validateField = (
  value: string,
  rules: ValidationRule,
  fieldName: keyof typeof ERROR_MESSAGES
): FieldValidationResult => {
  // Vérification de la présence d'une valeur non vide
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].required,
    };
  }

  // Suppression des espaces en début et fin de chaîne pour la validation
  const trimmedValue = value.trim();

  // Validation de la longueur minimale
  if (trimmedValue.length < rules.minLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].minLength,
    };
  }

  // Validation de la longueur maximale
  if (trimmedValue.length > rules.maxLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].maxLength,
    };
  }

  // Validation du format avec une expression régulière (si définie)
  if (rules.pattern !== null && !rules.pattern.test(trimmedValue)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].pattern,
    };
  }

  // Toutes les validations sont passées avec succès
  return { isValid: true };
};

/**
 * Valide le username (email)
 * Applique les règles de validation spécifiques aux adresses email
 * 
 * @param email - L'adresse email à valider
 * @returns Le résultat de la validation avec un éventuel message d'erreur
 */
export const validateEmail = (email: string): FieldValidationResult => {
  return validateField(email, VALIDATION_RULES.email, 'email');
};

/**
 * Valide le password
 * Applique les règles de validation spécifiques aux mots de passe
 * 
 * @param password - Le mot de passe à valider
 * @returns Le résultat de la validation avec un éventuel message d'erreur
 */
export const validatePassword = (password: string): FieldValidationResult => {
  return validateField(password, VALIDATION_RULES.password, 'password');
};

/**
 * Valide l'ensemble du formulaire d'authentification
 * Effectue la validation complète de l'email et du mot de passe
 * 
 * @param data - Les données du formulaire contenant email et password
 * @returns Un objet contenant l'état de validation global et la liste des erreurs
 */
export const validateAuth = (data: ValidateFormData): ValidationResult => {
  // Tableau pour collecter toutes les erreurs de validation
  const errors: string[] = [];

  // Validation de l'email
  const userNameResult = validateEmail(data.email);
  if (!userNameResult.isValid && userNameResult.error) {
    errors.push(userNameResult.error);
  }

  // Validation du mot de passe
  const passwordResult = validatePassword(data.password);
  if (!passwordResult.isValid && passwordResult.error) {
    errors.push(passwordResult.error);
  }

  // Retour du résultat global de la validation
  return {
    isValid: errors.length === 0,
    errors,
  };
};