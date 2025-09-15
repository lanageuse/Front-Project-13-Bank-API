export  const getStoredAuthData = () => {
    const localToken = localStorage.getItem("token")
    const localAuth = localStorage.getItem("auth")
    if (localToken && localAuth === "true") {
      return {
        isAuthenticated: true,
        token: localToken,
        rememberMe: true,
        status : "idle"
      }
    }
    const sessionToken = sessionStorage.getItem("token")
    const sessionAuth = sessionStorage.getItem("auth")
    if (sessionToken && sessionAuth === "true") {
      return {
        isAuthenticated: true,
        token: sessionToken,
        rememberMe: false,
        status : "idle"
      }
    }
    return {
      isAuthenticated: false,
      token: null,
      rememberMe: false,
      status : "idle"
    }
  }