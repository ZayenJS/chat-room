import { FC, useState } from 'react';
import Loading from '../../../components/Loading/Loading';

import styles from './Home.module.scss';
interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [state, setState] = useState({ isLoading: true });

  return (
    <div className={styles.Container}>
      {state.isLoading ? (
        <Loading
          onAnimationStart={() => setState((prevState) => ({ ...prevState, isLoading: true }))}
          onAnimationEnd={() => setState((prevState) => ({ ...prevState, isLoading: false }))}
        />
      ) : null}
      <h1>HOME</h1>
    </div>
  );
};

export default Home;
