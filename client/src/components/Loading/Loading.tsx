import { FC, HTMLAttributes } from 'react';

import chat from '../../assets/images/svg/chat.svg';

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
      <div className={styles.Content}>
        <div>
          <img src={chat} alt="" />
          <strong>Chatroom</strong>
        </div>
        <div>
          <h2 className={styles.Title}>Chargement</h2>
          <p className={styles.Subtitle}>
            Veuillez patienter
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
