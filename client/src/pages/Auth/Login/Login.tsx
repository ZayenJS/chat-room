import { useEffect } from 'react';
import { FC, FormEvent } from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';

import Field from '../../../containers/components/Field/Field';

import styles from './Login.module.scss';
interface LoginProps {
  isAuth: boolean;
  login: () => void;
}

const Login: FC<LoginProps & RouteComponentProps> = ({ login, isAuth }) => {
  const history = useHistory();

  useEffect(() => {
    if (isAuth) history.push('/');
  }, [isAuth, history]);

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    login();
  };

  return (
    <section className={styles.Container}>
      <form onSubmit={formSubmitHandler}>
        <Field
          name="emailOrUsername"
          reducerName="auth"
          type="text"
          label="Nom d'utilisateur ou e-mail"
          placeholder=" "
        />

        <Field
          name="password"
          reducerName="auth"
          type="password"
          label="Mot de passe"
          placeholder=" "
        />
        <div className={styles.BtnContainer}>
          <Link to={`/auth/inscription`}>Pas de compte ?</Link>
          <button>Se connecter</button>
        </div>
      </form>
      <Link className={styles.Forgot__Password} to="/auth/mot-de-passe-oublie">
        Mot de passe oublié ?
      </Link>
    </section>
  );
};

export default Login;
