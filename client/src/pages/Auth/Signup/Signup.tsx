import { useEffect } from 'react';
import { FC, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Field from '../../../containers/components/Field/Field';

import styles from './Signup.module.scss';
interface SignupProps {
  isSignupSuccess: boolean;
  signup: () => void;
}

const Signup: FC<SignupProps> = ({ signup, isSignupSuccess }) => {
  const history = useHistory();

  useEffect(() => {
    if (isSignupSuccess) history.push('/auth/connexion');
  }, [isSignupSuccess, history]);

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    signup();
  };

  return (
    <section>
      <div className={styles.Blur}></div>
      <form onSubmit={formSubmitHandler}>
        <Link to="/auth/connexion" className={styles.Arrow__Back}></Link>
        <Field name="email" reducerName="auth" type="email" label="Email" placeholder=" " />
        <Field
          name="username"
          reducerName="auth"
          type="text"
          label="Nom d'utilisateur"
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
          <button>S'inscrire</button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
