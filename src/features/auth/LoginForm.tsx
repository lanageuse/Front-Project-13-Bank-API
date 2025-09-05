import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useLoginMutation } from './authApiSlice';
import { clearLoginError, handleLoginError, handleLoginSucess} from './authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router';

// Types dédiés pour le formulaire
type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
}

const INITIAL_FORM_VALUE: LoginFormData = {
  email: "",
  password: "",
  remember: false,
} as const;

const LoginForm = () => {
  const [formValue, setFormValue] = useState<LoginFormData>(INITIAL_FORM_VALUE);
  const { email, password, remember } = formValue;
  const [login, { isError, isLoading, isSuccess }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()


  // Typage strict pour les événements de changement
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, type, checked, value } = e.target;
    setFormValue(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    dispatch(clearLoginError())
    try {
      const result = await login({ email, password }).unwrap();
      const token = result.body.token;
      dispatch(handleLoginSucess(token, remember))
      setFormValue(INITIAL_FORM_VALUE);
      void navigate("/")
    } catch (error) {
      dispatch(handleLoginError(error))
    }
  };

  return (
    <section className="sign-in-content">
      <FontAwesomeIcon icon={faUserCircle} />
      <h1>Sign In</h1>
      <form onSubmit={e => {void handleSubmit(e)}}>
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
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
};

export default LoginForm;