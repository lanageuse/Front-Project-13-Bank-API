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
