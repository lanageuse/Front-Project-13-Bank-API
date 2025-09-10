import { ERROR_MESSAGES, VALIDATION_RULES } from "../constants"
import type {
  ValidationRule,
  FieldValidationResult,
  ProfileData,
  ValidationResult,
} from "../types"

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
  fieldName: keyof typeof ERROR_MESSAGES,
): FieldValidationResult => {
  // Vérification de la présence d'une valeur non vide
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].required,
    }
  }

  // Suppression des espaces en début et fin de chaîne pour la validation
  const trimmedValue = value.trim()

  // Validation de la longueur minimale
  if (trimmedValue.length < rules.minLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].minLength,
    }
  }

  // Validation de la longueur maximale
  if (trimmedValue.length > rules.maxLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].maxLength,
    }
  }

  // Validation du format avec une expression régulière (si définie)
  if (!rules.pattern.test(trimmedValue)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES[fieldName].pattern,
    }
  }
  // Toutes les validations sont passées avec succès
  return { isValid: true }
}

/**
 * Valide le prenom (fisrtName)
 * Applique les règles de validation spécifié dans les régles de validation
 *
 * @param firstName - le prénom à valider
 * @returns Le résultat de la validation avec un éventuel message d'erreur
 */
export const validateFirstName = (firstName: string): FieldValidationResult => {
  return validateField(firstName, VALIDATION_RULES.firstName, "firstName")
}

/**
 * Valide le nom (lastname)
 * Applique les règles de validation spécifié dans les régles de validation
 *
 * @param lastname - le prénom à valider
 * @returns Le résultat de la validation avec un éventuel message d'erreur
 */
export const validateLastName = (lastName: string): FieldValidationResult => {
  return validateField(lastName, VALIDATION_RULES.lastName, "lastName")
}

/**
 * Valide l'ensemble du formulaire d'authentification
 * Effectue la validation complète du prénom et du nom
 *
 * @param data - Les données du formulaire contenant fisrtName et lastName
 * @returns Un objet contenant l'état de validation global et la liste des erreurs
 */
export const validateProfile = (data: ProfileData): ValidationResult => {
  // Tableau pour collecter toutes les erreurs de validation
  const errors: string[] = []
  // Validation de l'email
  const firstNameResult = validateFirstName(data.firstName)
  if (!firstNameResult.isValid && firstNameResult.error) {
    errors.push(firstNameResult.error)
  }
  // Validation du mot de passe
  const lastNameResult = validateLastName(data.lastName)
  if (!lastNameResult.isValid && lastNameResult.error) {
    errors.push(lastNameResult.error)
  }
  // Retour du résultat global de la validation
  return {
    isValid: errors.length === 0,
    errors,
  }
}
