import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/useAuth';

/**
 * Composant de formulaire d'authentification
 * @component
 * @description Formulaire de connexion avec validation et gestion des états de chargement
 * @returns {JSX.Element} Le formulaire de connexion complet
 */
export const AuthForm = () => {
  const {formValue : {email, password, remember}, handleChange, handleSubmit, isLoading} = useAuth()

  return (
    <section className="sign-in-content">
      <FontAwesomeIcon icon={faUserCircle} />
      <h1>Sign In</h1>
      <form onSubmit={e => { void handleSubmit(e); }}>
        <div className="input-wrapper">
          <label htmlFor="email">Username</label>
          <input 
            type="email" 
            value={email} 
            onChange={handleChange} 
            name="email" 
            id="email"
            required
            autoComplete="email"
          />
        </div>
        
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={handleChange} 
            name="password" 
            id="password"
            required
            autoComplete="current-password"
          />
        </div>
        
        <div className="input-remember">
          <input 
            type="checkbox" 
            checked={remember} 
            onChange={handleChange} 
            name="remember" 
            id="remember-me" 
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <button 
          className="sign-in-button" 
          type="submit"
          disabled = {isLoading}
        >
          {isLoading  ? 'Loading' : 'Sign In'}
        </button>
      </form>
    </section>
  );
};