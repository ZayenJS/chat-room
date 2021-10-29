import { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import styles from './ChatRoomHome.module.scss';

interface ChatRoomHomeProps {}

const ChatRoomHome: FC<ChatRoomHomeProps> = () => {
  return (
    <motion.div
      key="chat-home"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className={styles.Container}>
      <Link to="/chats/168a26a7-7f09-4d3d-af8a-70a8a54c6e36">Aller dans le chat</Link>
    </motion.div>
  );
};

export default ChatRoomHome;
