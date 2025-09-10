import type { LoginFormData } from "./types";

export const INITIAL_LOGIN_FORM_VALUE: LoginFormData = {
  email: "",
  password: "",
  remember: false,
} as const;