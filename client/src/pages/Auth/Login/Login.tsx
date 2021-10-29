import { FC, FormEvent, useEffect } from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <motion.section
      transition={{ duration: 0.5 }}
      initial={{ y: '-50%', x: '-50%', rotateY: 90 }}
      animate={{ y: '-50%', x: '-50%', rotateY: 0 }}
      exit={{ y: '-50%', x: '-50%', rotateY: 90 }}
      className={styles.Container}>
      <form onSubmit={formSubmitHandler}>
        <fieldset>
          <legend>Connexion</legend>
          <div className={styles.Fields}>
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
          </div>
          <div className={styles.BtnContainer}>
            <Link to={`/auth/inscription`}>Pas de compte ?</Link>
            <button>Se connecter</button>
          </div>
        </fieldset>
      </form>
      <Link className={styles.Forgot__Password} to="/auth/mot-de-passe-oublie">
        Mot de passe oublié ?
      </Link>
    </motion.section>
  );
};

export default Login;
