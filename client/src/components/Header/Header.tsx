import { FC } from 'react';
import { HeaderPropsFromRedux } from '../../containers/components/Header/Header';

import styles from './Header.module.scss';

const Header: FC<HeaderPropsFromRedux> = ({ logout }) => {
  return (
    <header className={styles.Container}>
      <nav>
        <ul>
          <button onClick={logout} type="button">
            Déconnexion
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
