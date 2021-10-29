import { FC } from 'react';
import { motion } from 'framer-motion';

import Header from '../../containers/components/Header/Header';

import styles from './Layout.module.scss';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <motion.div
      transition={{ bounce: false, duration: 0.5 }}
      initial={{ opacity: 0, y: '-100%' }}
      animate={{ opacity: 1, y: '0' }}
      exit={{ opacity: 0, y: '-100%' }}
      className={styles.Container}>
      <Header />
      <main>{children}</main>
      <footer>footer</footer>
    </motion.div>
  );
};

export default Layout;
