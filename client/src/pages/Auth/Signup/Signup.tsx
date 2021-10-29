import { FC, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
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
    <motion.section
      transition={{ duration: 0.5 }}
      initial={{ y: '-50%', x: '-50%', rotateY: 90 }}
      animate={{ y: '-50%', x: '-50%', rotateY: 0 }}
      exit={{ y: '-50%', x: '-50%', rotateY: 90 }}>
      <div className={styles.Blur}></div>
      <form onSubmit={formSubmitHandler}>
        <fieldset>
          <legend>Inscription</legend>
          <Link to="/auth/connexion" className={styles.Arrow__Back}></Link>
          <div className={styles.Fields}>
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
          </div>
          <div className={styles.BtnContainer}>
            <button>S'inscrire</button>
          </div>
        </fieldset>
      </form>
    </motion.section>
  );
};

export default Signup;
