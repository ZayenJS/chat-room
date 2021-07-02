import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import Auth from '../../containers/pages/Auth';

import styles from './Layout.module.scss';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.Container}>
      <header>header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  );
};

export default Layout;
