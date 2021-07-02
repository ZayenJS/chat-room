import { FC, HTMLAttributes } from 'react';

import styles from './Loading.module.scss';

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  initial?: boolean;
}

const Loading: FC<LoadingProps> = ({ initial = false, onAnimationStart, onAnimationEnd }) => {
  return (
    <div
      onAnimationStart={onAnimationStart}
      onAnimationEnd={onAnimationEnd}
      className={styles[`${initial ? 'Initial' : 'Container'}`]}>
      <div>
        <h2 className={styles.Title}>Loading</h2>
        <p className={styles.Subtitle}>Please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
