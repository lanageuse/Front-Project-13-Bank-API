import { AuthForm } from "../features/auth";

/**
 * Page de connexion
 * @component
 * @description Page contenant le formulaire d'authentification
 * @returns {JSX.Element} La page de connexion avec le formulaire d'auth
 */
const SignIn = () => {
    return ( 
        <>
        <AuthForm/>
        </>
     );
}
 
export default SignIn;