import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Loading from '../../../components/Loading/Loading';

import styles from './Home.module.scss';
interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [state, setState] = useState({ isLoading: true });

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.Container}>
      {/* {state.isLoading ? (
        <Loading
          onAnimationStart={() => setState((prevState) => ({ ...prevState, isLoading: true }))}
          onAnimationEnd={() => setState((prevState) => ({ ...prevState, isLoading: false }))}
        />
      ) : null} */}
      <h1>HOME</h1>
      <Link to="/chats">chats</Link>
    </motion.div>
  );
};

export default Home;
