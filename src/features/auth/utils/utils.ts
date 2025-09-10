export  const getStoredAuthData = () => {
    const localToken = localStorage.getItem("token")
    const localAuth = localStorage.getItem("auth")
    if (localToken && localAuth === "true") {
      return {
        isAuthenticated: true,
        token: localToken,
        rememberMe: true,
      }
    }
    const sessionToken = sessionStorage.getItem("token")
    const sessionAuth = sessionStorage.getItem("auth")
    if (sessionToken && sessionAuth === "true") {
      return {
        isAuthenticated: true,
        token: sessionToken,
        rememberMe: false,
      }
    }
    return {
      isAuthenticated: false,
      token: null,
      rememberMe: false,
    }
  }